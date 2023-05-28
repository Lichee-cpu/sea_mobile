<template>
  <div class="qr-code-scanner">
    <video ref="video" class="video" muted playsinline autoplay></video>
    <canvas ref="canvas" class="canvas" style="display: none"></canvas>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from "vue";
import QrCodeReader from "qrcode-reader";
import { Toast } from "vant";

export default {
  setup(props, { emit }) {
    const video = ref(null);
    const canvas = ref(null);
    const context = ref(null);
    const qrCodeReader = new QrCodeReader();

    const init = async () => {
      console.log("init", video.value, canvas.value);
      context.value = canvas.value.getContext("2d");
      await setupCamera(); // 等待相机准备好
      start();
    };

    const setupCamera = async () => {
      const constraints = {
        video: {
          facingMode: "environment",
        },
      }; // 设置相机参数，启用后置摄像头
      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints); // 获取相机流
        video.value.srcObject = stream; // 将相机流赋值给video标签
        video.value.addEventListener("loadedmetadata", () => {
          canvas.value.width = video.value.videoWidth;
          canvas.value.height = video.value.videoHeight;
        }); // 监听video标签的loadedmetadata事件，当video标签加载完毕后，将canvas的宽高设置为video的宽高
      } catch (error) {
        console.error("Error accessing camera:", error);
      }
    };

    const start = () => {
      requestAnimationFrame(scan); // 开始扫描二维码
    };

    const stop = () => {
      if (video.value.srcObject) {
        video.value.srcObject.getTracks().forEach((track) => track.stop());
      }
    };

    // 扫描二维码
    const scan = async () => {
      console.log("scan");
      context.value.drawImage(
        video.value,
        0,
        0,
        canvas.value.width,
        canvas.value.height
      );
      const imageData = context.value.getImageData(
        0,
        0,
        canvas.value.width,
        canvas.value.height
      );

      qrCodeReader.decode(imageData); // 解码二维码
      qrCodeReader.callback = (error, result) => {
        if (error) {
          console.error(error);
          Toast.fail("二维码识别失败" + error);
          requestAnimationFrame(scan);
        } else {
          Toast.success("二维码识别成功" + result);
          emit("qr-code-scanned", result);
          stop();
        }
      };

      // try {
      //   await qrCodeReader.decode(imageData); // 解码二维码
      //   console.log("qrCodeReader", qrCodeReader);
      //   qrCodeReader.callback = (error, result) => {
      //     console.log("error");
      //     console.log("result");
      //     if (error) {
      //       console.error(error);
      //       requestAnimationFrame(scan);
      //     } else {
      //       emit("qr-code-scanned", result);
      //       stop();
      //     }
      //   };
      // } catch (error) {
      //   console.error("Error decoding QR code:", error);
      //   requestAnimationFrame(scan);
      // }
    };

    onMounted(init);
    onBeforeUnmount(stop);

    return {
      video,
      canvas,
    };
  },
};
</script>

<style scoped>
.qr-code-scanner {
  position: relative;
  max-width: 100%;
  max-height: 100%;
}
.video,
.canvas {
  max-width: 100%;
  max-height: 100%;
}
</style>
