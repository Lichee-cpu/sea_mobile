<template>
  <div class="record-box">
    <video ref="video" class="video" autoplay muted></video>
    <div class="duration" v-show="recording">{{ duration }}s</div>
    <div v-if="videoUrl">
      <video class="video" controls :src="videoUrl"></video>
      <p>文件名: {{ videoFile.name }}</p>
      <p>文件类型: {{ videoFile.type }}</p>
      <p>最后修改时间戳: {{ videoFile.lastModified }}</p>
      <p>最后修改时间对象: {{ videoFile.lastModified }}</p>
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
import { ref } from "vue";

export default {
  setup() {
    const video = ref();
    let setTimeoutTimer = ref();
    let setIntervalTimer = ref();
    const recorder = ref();
    const recording = ref(false); // 录制中
    const roomId = ref("test");
    const videoUrl = ref();
    const videoFile = ref();
    const duration = ref(0);
    const setRecordTimer = ref(); //定时器对象

    // 开始录制
    const startRecording = async () => {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const mime = MediaRecorder.isTypeSupported("video/webm; codecs=vp9")
          ? "video/webm; codecs=vp9"
          : "video/webm";
        console.log(mime);

        let stream;

        try {
          // 尝试获取后置摄像头
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
        recorder.value = recordAndUpload(stream, mime);
        video.value.srcObject = stream;
        video.value.play();
        recording.value = true;
      } else {
        console.log("浏览器不支持MediaRecorder API");
      }
    };
    const recordAndUpload = (stream, mime) => {
      let chunks = [],
        videoStartTime,
        recorder = new MediaRecorder(stream, {
          mimeType: mime,
        }); //创建新的MediaRecorder对象
      recorder.ondataavailable = function (e) {
        chunks.push(e.data);
      }; //当触发start或者stop都会执行这个方法
      // 设置录制时长
      setRecordTimer.value = setInterval(() => {
        duration.value += 1;
      }, 1000);
      recorder.onstop = () => {
        videoStartTime = Date.now();
        uploadChunk(chunks, Date.now() - videoStartTime, "end");
      };
      recorder.start();
      return recorder;
    };

    // 停止录制并清理资源
    const stopRecording = async () => {
      clearTimeout(setTimeoutTimer.value);
      clearInterval(setIntervalTimer.value);
      clearInterval(setRecordTimer.value);
      setTimeoutTimer.value = setIntervalTimer.value = null;
      recorder.value.stop();
      video.value.srcObject.getTracks().forEach((track) => {
        track.stop();
      });
    };

    // 上传函数
    const uploadChunk = async (chunks, recordTime) => {
      const blob = new Blob(chunks, { type: "video/webm" });
      const formData = new FormData();
      formData.append("file", blob);
      formData.append("filename", `${roomId.value}.webm`);
      formData.append("time", `${new Date().getTime()}`);
      formData.append("duration", recordTime);
      videoUrl.value = URL.createObjectURL(blob);
      console.log("预览地址", videoUrl.value);
      videoFile.value = {
        name: `${roomId.value}.webm`,
        type: "video/webm",
        lastModified: new Date().getTime(),
        size: blob.size,
      };
      recording.value = false;
    };

    return {
      video,
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
<style lang="less" scoped>
.video {
  width: 100%;
}
.record-box {
  position: relative;
  .duration {
    position: absolute;
    right: 10px;
    top: 10px;
    font-size: 36px;
    color: red;
  }
}
</style>
