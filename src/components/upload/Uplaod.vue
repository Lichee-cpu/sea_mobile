<!--
 * @Author: lxiang
 * @Date: 2022-05-25 19:21:10
 * @LastEditors: lxiang
 * @LastEditTime: 2022-05-27 10:10:24
 * @description: 上传主页
 * @FilePath: \sea_mobile\src\components\upload\Uplaod.vue
-->
<template>
  <div>
    <!-- 定位区域 -->
    <div>
      <span>资料上传</span>
    </div>
    <!-- 上传文件区域 -->
    <div>
      <van-collapse v-model="activeNames">
        <!-- 上传图片 -->
        <van-collapse-item title="图片" name="1">
          <upload-image />
        </van-collapse-item>

        <!-- 上传视频 -->
        <van-collapse-item title="视频" name="2">
          <upload-video />
        </van-collapse-item>

        <!-- 上传音频 -->
        <van-collapse-item title="音频" name="3">
          在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。
        </van-collapse-item>
      </van-collapse>
    </div>
    <!-- 文件描述区 -->
    <div>描述区域</div>
  </div>
</template>

<script>
import { ref } from 'vue'
import UploadImage from './UploadImage.vue'
import UploadVideo from './UploadVideo.vue'
export default {
  components: {
    UploadImage,
    UploadVideo,
  },
  setup() {
    const activeNames = ref(['1']) // 手风琴展开

    return { activeNames }
  },
}
</script>
