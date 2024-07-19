<template>
  <div class="record-box">
    <canvas ref="canvas" class="canvas"></canvas>
    <div class="duration" v-show="recording">{{ duration }}s</div>
    <div v-if="videoUrl">
      <video class="video" controls :src="videoUrl"></video>
      <p>文件名: {{ videoFile.name }}</p>
      <p>文件类型: {{ videoFile.type }}</p>
      <p>最后修改时间戳: {{ videoFile.lastModified }}</p>
      <p>文件大小: {{ (videoFile.size / 1024 / 1024).toFixed(2) }} MB</p>
    </div>
    <div v-else-if="videoFile">
      <p>已选择视频文件，但尚未生成预览URL。</p>
    </div>
    <button @click="startRecording" v-show="!recording">开始录制</button>
    <button @click="stopRecording" v-show="recording">停止录制</button>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";

export default {
  setup() {
    const canvas = ref(null);
    const ctx = ref(null);
    const video = ref(null);
    let mediaRecorder = null;
    const recording = ref(false); // 录制中
    const roomId = ref("test");
    const videoUrl = ref(null);
    const videoFile = ref(null);
    const duration = ref(0);
    const setRecordTimer = ref(null); //定时器对象
    let animationFrameId = null; // 动画帧ID

    onMounted(() => {
      ctx.value = canvas.value.getContext("2d");
    });

    // 开始录制
    const startRecording = async () => {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const mime = MediaRecorder.isTypeSupported("video/webm; codecs=vp9")
          ? "video/webm; codecs=vp9"
          : "video/webm";
        console.log(mime);

        let stream;

        try {
          stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: { exact: "environment" } },
            audio: true,
          });
        } catch (error) {
          console.log("无法获取后置摄像头，尝试前置摄像头...");
          try {
            stream = await navigator.mediaDevices.getUserMedia({
              video: { facingMode: "user" },
              audio: true,
            });
          } catch (error2) {
            console.error("无法获取任何摄像头或麦克风", error2);
            return;
          }
        }

        video.value = document.createElement("video");
        video.value.srcObject = stream;
        video.value.onloadedmetadata = function () {
          canvas.value.width = video.value.videoWidth;
          canvas.value.height = video.value.videoHeight;
          drawVideo(stream);
        };
        video.value.play();

        mediaRecorder = new MediaRecorder(stream, { mimeType: "video/webm" });
        mediaRecorder.ondataavailable = function (e) {
          const videoBlob = new Blob([e.data], { type: "video/webm" });
          videoUrl.value = URL.createObjectURL(videoBlob);
          videoFile.value = {
            name: `${roomId.value}.webm`,
            type: "video/webm",
            lastModified: new Date().getTime(),
            size: videoBlob.size,
          };
        };
        mediaRecorder.start();

        setRecordTimer.value = setInterval(() => {
          duration.value += 1;
        }, 1000);
        recording.value = true;
      } else {
        console.log("浏览器不支持MediaRecorder API");
      }
    };

    const drawVideo = () => {
      const drawLoop = () => {
        ctx.value.drawImage(
          video.value,
          0,
          0,
          canvas.value.width,
          canvas.value.height
        );
        ctx.value.font = "36px Arial";
        ctx.value.fillStyle = "rgba(255, 0, 0, 0.5)";
        const currentTime = new Date().toLocaleTimeString(); // 获取当前时间
        ctx.value.fillText(currentTime, 10, 36); // 添加实时时间水印
        animationFrameId = requestAnimationFrame(drawLoop);
      };

      drawLoop();
    };

    // 停止录制并清理资源
    const stopRecording = async () => {
      clearInterval(setRecordTimer.value);
      if (mediaRecorder) mediaRecorder.stop();
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      recording.value = false;
      video.value.pause();
      video.value.srcObject.getTracks().forEach((track) => {
        track.stop();
      });
    };

    return {
      canvas,
      startRecording,
      stopRecording,
      recording,
      roomId,
      videoUrl,
      videoFile,
      duration,
    };
  },
};
</script>

<style>
.canvas,
.video {
  width: 100%;
  height: auto;
}
</style>
