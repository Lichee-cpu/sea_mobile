<!--
 * @Author: lxiang
 * @Date: 2022-05-25 19:51:14
 * @LastEditors: lxiang
 * @LastEditTime: 2022-05-25 20:03:31
 * @description: 上传视频
 * @FilePath: \sea_mobile\src\components\upload\UploadVideo.vue
-->
<template>
  <div>
    <van-uploader v-model="fileList" multiple accept="video/mp4" />
  </div>
</template>
<script>
import { ref } from 'vue'

export default {
  setup() {
    const fileList = ref([
      {
        url: 'http://lichee-img.oss-cn-hangzhou.aliyuncs.com/video/69c697f3da0bd7f9d455a6f4a5a33edf.mp4',
      },
      // Uploader 根据文件后缀来判断是否为图片文件
      // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
      {
        url: 'http://lichee-img.oss-cn-hangzhou.aliyuncs.com/video/ba5a82e4246ad62d7c9350019d0bf80a.mp4',
      },
    ])

    return {
      fileList,
    }
  },
}
</script>
