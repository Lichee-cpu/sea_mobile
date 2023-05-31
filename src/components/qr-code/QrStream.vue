<template>
  <div class="qr-stream">
    <video ref="video" class="video"></video>
    <canvas ref="canvas" class="canvas"></canvas>
    <div v-if="result" class="result">
      <p>扫描结果：{{ result }}</p>
    </div>
  </div>
</template>

<script>
import { onMounted, ref, onBeforeUnmount } from "vue";
import jsQR from "jsqr";

export default {
  name: "QrStream",
  setup(props, { emit }) {
    const video = ref(null); // 视频元素
    const canvas = ref(null); // 画布元素
    const canvasContext = ref(null); // 画布上下文
    const result = ref(null);

    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
        });
        video.value.srcObject = stream; // 将视频流设置为video元素的源
        video.value.play(); // 播放视频
        // 获取视频流的宽高比例
        const aspectRatio = stream
          .getVideoTracks()[0]
          .getSettings().aspectRatio;
        // 设置画布的宽为100%，高为宽的比例
        canvas.value.width = canvas.value.clientWidth;
        canvas.value.height = canvas.value.clientWidth / aspectRatio;

        requestAnimationFrame(tick); // 开始扫描
      } catch (err) {
        console.error(err); // 无法访问用户媒体设备
      }
    };

    const stopCamera = () => {
      try {
        video.value.srcObject.getTracks().forEach((track) => track.stop()); // 停止视频流
        // result.value = null; // 清除扫描结果
        // video.value.srcObject = null; // 清除video元素的源
      } catch (err) {
        console.error(err);
      }
    };

    // 扫描
    const tick = () => {
      canvasContext.value.drawImage(
        video.value,
        0,
        0,
        canvas.value.width,
        canvas.value.height
      ); // 将当前视频帧绘制到画布上

      const imageData = canvasContext.value.getImageData(
        0,
        0,
        canvas.value.width,
        canvas.value.height
      ); // 获取画布上的图像数据

      const code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: "dontInvert",
      }); // 解析二维码

      if (code) {
        result.value = code.data;
        stopCamera();
        emit("decode", code.data); // 返回结果
      }
      requestAnimationFrame(tick);
    };

    onMounted(() => {
      canvasContext.value = canvas.value.getContext("2d", {
        willReadFrequently: true,
      }); // 获取画布上下文
      startCamera();
    });

    // 销毁时停止视频流
    onBeforeUnmount(() => {
      stopCamera();
    });

    return {
      video,
      canvas,
      result,
    };
  },
};
</script>

<style lang="less" scoped>
.qr-stream {
  position: relative;
  width: 100%;
  .video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    object-fit: cover;
    z-index: 1;
  }
  .canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }
  .result {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    p {
      color: #fff;
      font-size: 20px;
      text-align: center;
      line-height: 100%;
      margin-top: 20px;
    }
  }
}
</style>
