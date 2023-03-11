<template>
  <div class="face-camera">
    <!-- 相机模块 -->
    <div class="camera-container">
      <video ref="video" class="camera-video" autoplay></video>
      <canvas ref="canvas" class="camera-canvas"></canvas>
      <div class="camera-mask"></div>
    </div>
    <!-- 拍照按钮 -->
    <div class="camera-button">
      <van-icon
        v-if="!loading"
        name="passed"
        @click="passed"
        size="60px"
        color="green"
      />
      <van-icon v-else name="revoke" @click="revoke" size="50px" />
    </div>
    <!-- 图显示 -->
  </div>
</template>

<script>
import { ref, onMounted } from "vue";

export default {
  name: "Camera",
  setup() {
    const video = ref(null); // video实例
    const canvas = ref(null); // canvas实例
    const mask = ref(null); //遮罩层实例
    const stream = ref(null); // 摄像头流
    const loading = ref(false); // 验证中
    // 设置摄像头参数
    const constraints = {
      audio: false,
      video: {
        facingMode: { exact: "user" }, // 优先使用前置摄像头
        aspectRatio: 1, // 设置宽高比
        width: { min: 480, ideal: 720, max: 1080 }, // 设置视频宽度
        height: { min: 480, ideal: 720, max: 1080 }, // 设置视频高度
      },
    };

    // 启动摄像头
    const startCamera = async () => {
      if (navigator.mediaDevices === undefined) {
        navigator.mediaDevices = {};
      }
      if (navigator.mediaDevices.getUserMedia === undefined) {
        navigator.mediaDevices.getUserMedia = function (constraints) {
          var getUserMedia =
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia ||
            navigator.getUserMedia;
          if (!getUserMedia) {
            return Promise.reject(
              new Error("getUserMedia is not implemented in this browser")
            );
          }
          return new Promise(function (resolve, reject) {
            getUserMedia.call(navigator, constraints, resolve, reject);
          });
        };
      }
      if (window.stream) {
        window.stream.getTracks().forEach((track) => {
          track.stop();
        });
      }

      try {
        stream.value = await navigator.mediaDevices.getUserMedia(constraints); // 获取摄像头流
        video.value.srcObject = stream.value; // 设置video的src为摄像头流
      } catch (err) {
        console.log("开启摄像头失败：" + err);
      }
    };

    // 拍照
    const passed = () => {
      loading.value = true; // 开启验证中
      const context = canvas.value.getContext("2d");
      context.drawImage(
        video.value,
        0,
        0,
        canvas.value.width,
        canvas.value.height
      );
      const dataURL = canvas.value.toDataURL("image/png");
      console.log(dataURL);
      stream.value.getVideoTracks()[0].stop(); // 关闭摄像头
    };

    // 撤销
    const revoke = () => {
      loading.value = false; // 关闭验证中
      const context = canvas.value.getContext("2d");
      context.clearRect(0, 0, canvas.value.width, canvas.value.height); // 清空canvas
      startCamera();
    };

    onMounted(() => {
      startCamera();
    });

    return {
      video,
      canvas,
      mask,
      passed,
      revoke,
      loading,
    };
  },
};
</script>

<style lang="less" scoped>
.face-camera {
  width: 100%;
  height: 100%;
  padding: 20% 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.camera-container {
  width: 50%;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  position: relative;
  margin: 0 auto;
  .camera-video {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    aspect-ratio: 1 / 1;
    display: block;
    border-radius: 50%;
    transform: rotateY(180deg);
    z-index: 1;
  }
  .camera-canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    transform: rotateY(180deg);
    z-index: 2;
  }
  .camera-mask {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;

    outline: 50vw solid #fff;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 3;
  }
}

.camera-button {
  margin: 0 auto;
  bottom: 0;
  text-align: center;
  display: flex;
  align-items: center;
}
</style>
