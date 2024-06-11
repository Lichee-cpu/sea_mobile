<template>
  <div>
    <video ref="video" width="640" height="480" autoplay muted></video>
    <button @click="startRecording">开始录制</button>
    <button @click="stopRecording">停止录制</button>
  </div>
</template>

<script>
import { ref, getCurrentInstance } from "vue";
export default {
  setup() {
    const video = ref(null);
    const { proxy } = getCurrentInstance();
    let setTimeoutTimer = ref();
    let setIntervalTimer = ref();
    const recorder = ref();
    const recordTime = 10; // 每隔recordTime时间(60秒)录制一个视频
    // 开始录制
    const startRecording = async () => {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const mime = MediaRecorder.isTypeSupported("video/webm; codecs=vp9")
          ? "video/webm; codecs=vp9"
          : "video/webm";
        console.log(mime);

        let stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        stream.value = stream;
        recorder.value = recordAndUpload(stream, mime, recordTime);
        //后面每隔一分钟创建新的MediaRecorder对象
        setIntervalTimer.value = setInterval(() => {
          recorder.value = recordAndUpload(stream, mime, recordTime);
        }, recordTime * 1000);
        video.value.srcObject = stream.value;
        video.value.play();
      } else {
        console.log("浏览器不支持MediaRecorder API");
      }
    };
    //每隔recordTime时间(60秒)录制一个视频
    const recordAndUpload = (stream, mime, recordTime) => {
      let chunks = [],
        videoStartTime,
        recorder = new MediaRecorder(stream, {
          mimeType: mime,
        }); //创建新的MediaRecorder对象
      recorder.ondataavailable = function (e) {
        chunks.push(e.data);
      }; //当触发start或者stop都会执行这个方法
      recorder.onstop = () => {
        if (setTimeoutTimer.value) {
          uploadChunk(chunks, recordTime * 1000);
        } else {
          //当手动点了停止，那么这个时间就不是确定的了，需要计算
          uploadChunk(chunks, Date.now() - videoStartTime);
        }
      };
      //每隔recordTime时间(60秒)自动去触发停止stop录像事件
      setTimeoutTimer.value = setTimeout(() => {
        recorder.stop();
      }, recordTime * 1000);
      recorder.start();
      videoStartTime = Date.now();
      return recorder;
    };

    // 停止录制并清理资源
    const stopRecording = async () => {
      clearTimeout(setTimeoutTimer.value);
      clearInterval(setIntervalTimer.value);
      setTimeoutTimer.value = setIntervalTimer.value = null;
      recorder.value.stop();
      video.value.srcObject.getTracks().forEach((track) => {
        track.stop();
      });
      const res = await proxy.$http.post("/api/upload/videoMerge", {
        directory: "BMA20240608",
        filename: "BMA20240608.webm",
      });
      console.log(res);
    };

    // 上传函数
    const uploadChunk = async (chunks, recordTime) => {
      const blob = new Blob(chunks, { type: "video/webm" });
      const formData = new FormData();
      formData.append("file", blob);
      formData.append("filename", "BMA20240608.webm");
      formData.append("time", `${new Date().getTime()}`);
      formData.append("duration", recordTime);
      await proxy.$http.post("/api/upload/onlineVideo", formData);
      // 下载到本地
      // let url = URL.createObjectURL(blob);
      // let fileName = `file_${new Date().getTime()}.webm`;
      // const aLink = document.createElement("a");
      // aLink.download = fileName;
      // aLink.href = url;
      // document.body.appendChild(aLink);
      // aLink.click();
      // aLink.remove();
      // window.URL.revokeObjectURL(url);
    };

    return {
      video,
      startRecording,
      stopRecording,
    };
  },
};
</script>
