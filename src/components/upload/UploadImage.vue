<!--
 * @Author: lxiang
 * @Date: 2022-05-25 19:36:08
 * @LastEditors: lxiang
 * @LastEditTime: 2022-05-25 20:33:17
 * @description: 图片上传处理页
 * @FilePath: \sea_mobile\src\components\upload\UploadImage.vue
-->
<template>
  <div>
    <van-uploader
      v-model="fileList"
      multiple
      :max-size="500 * 1024"
      accept="image/*"
      @oversize="onOversize"
    >
      <template #default>
        <div class="van-uploader__upload upbutton" @click-upload="addFile">
          自定义上传
        </div>
      </template>
    </van-uploader>
    <van-popup
      v-model:show="show"
      closeable
      position="bottom"
      :style="{ height: '30%' }"
    >
      <div>立即拍照</div>
      <div>打开相册</div>
    </van-popup>
  </div>
</template>
<script>
import { ref } from 'vue'
import { Toast } from 'vant'

export default {
  setup() {
    const show = ref(false)

    const fileList = ref([
      {
        url: 'http://lichee-img.oss-cn-hangzhou.aliyuncs.com/car-img/1625894251540cb8bf4279a31f2f3e1ec056e44d743f1.jpg',
      },
      // Uploader 根据文件后缀来判断是否为图片文件
      // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
      {
        url: 'http://lichee-img.oss-cn-hangzhou.aliyuncs.com/car-img/16258961152900.png',
        isImage: true,
      },
    ])

    const onOversize = (file) => {
      console.log(file)
      Toast('文件大小不能超过 500kb')
    }
    // 添加文件
    const addFile = () => {
      console.log('ss')
      show.value = true
    }

    return {
      show,
      fileList,
      onOversize,
      addFile,
    }
  },
}
</script>
<style lang="less" scoped>
.upbutton {
  display: flex;
}
.van-uploader {
  display: flex;
}
</style>
