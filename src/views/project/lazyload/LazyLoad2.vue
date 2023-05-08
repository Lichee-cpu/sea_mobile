<!--
 * @Author: lxiang
 * @Date: 2023-05-08 09:04:28
 * @LastEditors: lxiang
 * @LastEditTime: 2023-05-08 17:02:54
 * @description: 原生懒加载
 * @FilePath: \sea_mobile\src\views\project\lazyload\LazyLoad2.vue
-->
<template>
  <div class="img-box">
    <LazyImage
      class="img"
      v-for="item in images"
      :key="item"
      :src="`http://img.lichee.top/img/autoshow/golf${item}.jpg`"
    />
  </div>
</template>

<script>
import {  ref } from "vue";
import LazyImage from "./LazyImage.vue";
export default {
  components: {
    LazyImage,
  },
  setup() {
    const images = ref([2, 12, 32, 42, 52, 62, 3, 13, 23, 33, 43]);

    return {
      images,
    };
  },
};
</script>

<style lang="less" scoped>
.img-box {
  margin: 12px;
}
.img {
  width: 100%;
}
</style>
