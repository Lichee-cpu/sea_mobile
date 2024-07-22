<template>
  <div>
    <div>微信支持，内置浏览器支持，OA支持8s，chrome只支持相册选择</div>
    <div class="van-uploader__preview">
      <div class="van-uploader__preview-image" @click="uploadFile('video')">
        <input
          type="file"
          ref="uploadVideo"
          name="avatar"
          accept="video/*"
          style="display: none"
        />
        <img
          src="@/assets/icon/image-collection/icon_ziliaoshangchuan.png"
          alt="添加"
          class="van-image__img"
        />
      </div>
    </div>

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
  </div>
</template>

<script>
import { ref, onUnmounted } from "vue";

export default {
  setup() {
    const videoFile = ref(null);
    const videoUrl = ref(null);
    const uploadVideo = ref(); // 上传视频的input元素

    const uploadFile = (type) => {
      if (type === "video") {
        uploadVideo.value.click();
        uploadVideo.value.onchange = (e) => {
          alert(JSON.stringify(e))
          videoFile.value = e.target.files[0];
          videoUrl.value = URL.createObjectURL(videoFile.value);
        };
      }
    };

    // 当组件卸载时，释放创建的URL对象以避免内存泄漏
    onUnmounted(() => {
      if (videoUrl.value) {
        URL.revokeObjectURL(videoUrl.value);
      }
    });

    return {
      videoFile,
      videoUrl,
      uploadFile,
      uploadVideo,
    };
  },
};
</script>

<style scoped>
/* 添加你的样式 */
.video {
  width: 100%;
}
</style>
