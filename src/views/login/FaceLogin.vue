<template>
  <div class="camera-container">
    <video ref="video" class="camera-video" autoplay></video>
    <div class="camera-mask"></div>

    <button @click="takePicture" class="camera-button">拍照</button>
  </div>
  <div class="photo">
    <canvas ref="canvas" class="camera-canvas"></canvas>
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
    // 设置摄像头参数
    const constraints = {
      audio: false,
      video: {
        facingMode: { exact: "user" }, // 优先使用前置摄像头
        width: 720,
        height: 720,
      },
    };

    // 启动摄像头
    const startCamera = async () => {
      try {
        stream.value = await navigator.mediaDevices.getUserMedia(constraints); // 获取摄像头流
        video.value.srcObject = stream.value; // 设置video的src为摄像头流
      } catch (err) {
        console.log(err);
      }
    };

    // 绘制遮罩层
    const drawImage = () => {
      const context = canvas.value.getContext("2d");
      context.drawImage(
        video.value,
        0,
        0,
        canvas.value.width,
        canvas.value.height
      );
    };

    // 拍照
    const takePicture = () => {
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
      // stream.value.getVideoTracks()[0].stop(); // 关闭摄像头
    };

    onMounted(() => {
      startCamera();
    });

    return {
      video,
      canvas,
      mask,
      drawImage,
      takePicture,
    };
  },
};
</script>

<style>
.camera-container {
  width: 50vw;
  height: 50vw;
  overflow: hidden;
  position: relative;
  margin: 0 auto;
}

.camera-mask {
  width: 100%;
  height: 100%;
  outline: 9999px solid #fff;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  border-radius: 50%;
  margin: auto;
  cursor: move;
}

.camera-video {
  height: 100%;
  display: block;
}

.camera-canvas {
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 3;
}

.camera-button {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 4;
}
.photo {
  width: 200px;
  height: 200px;
}
</style>
