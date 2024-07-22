<template>
  <div>
    <div>仅支持EMobile7，OA端使用，只能使用sdk提供的上传方法，未提供分片方法</div>
    <div class="van-uploader__preview">
      <div class="van-uploader__preview-image" @click="uploadFile()">
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
    <van-popup
      v-model:show="showBottom"
      position="bottom"
      :style="{ height: '144px' }"
    >
      <div class="item" @click="uploadFile('album')">相册</div>
      <div class="item" @click="uploadFile('camera')">录像</div>
    </van-popup>

    <div v-if="imgUrl">
      <p>封面</p>
      <img :src="imgUrl" alt="" />
    </div>
  </div>
</template>

<script>
import { ref, onUnmounted } from "vue";
export default {
  setup() {
    const videoUrl = ref(null);
    const imgUrl = ref(null);
    const uploadVideo = ref(); // 上传视频的input元素
    const showBottom = ref(false);

    /* eslint-disable no-unused-vars */
    const uploadFile = async (type) => {
      if (!type) {
        showBottom.value = true;
        return;
      } else {
        showBottom.value = false;
        // 底部弹出选择相机还是相册
        try {
          const res = await new Promise((resolve, reject) => {
            if (type == "album") {
              em.chooseVideo({
                count: 1, // 默认9 int
                sourceType: ["album"], // 可以指定来源是相册还是相机，默认二者都有
                success: resolve,
                error: reject,
              });
            } else {
              em.chooseVideo({
                count: 1, // 默认9 int
                sourceType: ["camera"], // 可以指定来源是相册还是相机，默认二者都有
                videoMaximumDuration: 300, //视频拍摄最大时间，单位s 默认10*60s
                success: resolve,
                error: reject,
              });
            }
          });
          // 安卓录像只有localIds路径，相册有localIds路径和covers封面
          alert(JSON.stringify(res));
          imgUrl.value = `data:image/jpeg;base64,${res.covers[0]}`;
          const ob = await new Promise((resolve, reject) => {
            em.getLocalImgData({
              localId: res.localIds, // 图片的localID（由chooseImage获取，支持单个字符串或数组）
              success: resolve,
              error: reject,
            });
          });
          // 安卓选取有clientType和localData
          alert(JSON.stringify(ob));
          videoUrl.value = `data:video/mp4;base64,${ob.localData[0]}`;
          // // base64转为在线预览url，如果是
          // const parts = res.localIds[0].split(".");
          // const getFileExtension =
          //   parts.length > 1 ? `.${parts.pop().toLowerCase()}` : "";
          // videoUrl.value =
          //   getFileExtension == ".mp4"
          //     ? `data:video/mp4;base64,${ob[0]}`
          //     : `data:video/mov;base64,${ob[0]}`;
          // // 将base64拼接生成在线预览URL
        } catch (e) {
          alert(e);
        }
      }
    };
    /* eslint-enable no-unused-vars */

    // 当组件卸载时，释放创建的URL对象以避免内存泄漏
    onUnmounted(() => {
      if (videoUrl.value) {
        URL.revokeObjectURL(videoUrl.value);
      }
    });

    return {
      videoUrl,
      imgUrl,
      uploadFile,
      uploadVideo,
      showBottom,
    };
  },
};
</script>

<style scoped>
/* 添加你的样式 */
.video {
  width: 100%;
}
.item {
  text-align: center;
  font-size: 18px;
  line-height: 18px;
  margin: 36px;
}
</style>
