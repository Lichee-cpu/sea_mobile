<!--
 * @Author: lxiang
 * @Date: 2022-05-25 19:36:08
 * @LastEditors: lxiang
 * @LastEditTime: 2022-05-26 15:22:35
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
      @click-upload="show = true"
      @oversize="onOversize"
    >
    </van-uploader>
    <van-action-sheet
      v-model:show="show"
      :actions="actions"
      @select="onSelect"
    />
  </div>
</template>
<script>
import { ref } from 'vue'
import { Toast } from 'vant'

export default {
  setup() {
    const show = ref(false)
    const actions = [{ name: '拍照' }, { name: '相册' }]
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

    const onSelect = (value) => {
      console.log(value)
    }
    // 添加文件
    const addFile = (res) => {
      console.log('ss', res)
      show.value = true
    }

    return {
      show,
      actions,
      fileList,
      onOversize,
      addFile,
      onSelect,
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
.popup {
  text-align: center;
  margin-top: 50px;
  div {
    height: 40px;
    line-height: 30px;
  }
}
</style>
