<!--
 * @Author: lxiang
 * @Date: 2023-05-08 16:34:50
 * @LastEditors: lxiang
 * @LastEditTime: 2023-05-08 16:37:44
 * @description: vant的懒加载
 * @FilePath: \sea_mobile\src\views\project\lazyload\LazyVant.vue
-->
<template>
  <div class="img-box" ref="Native">
    <img v-for="img in imageList" v-lazy="img" :key="img" class="img" />
  </div>
</template>

<script>
export default {
  setup() {
    return {
      imageList: [
        "http://img.lichee.top/img/autoshow/golf1.jpg",
        "http://img.lichee.top/img/autoshow/golf2.jpg",
        "http://img.lichee.top/img/autoshow/golf3.jpg",
        "http://img.lichee.top/img/autoshow/golf4.jpg",
        "http://img.lichee.top/img/autoshow/golf5.jpg",
        "http://img.lichee.top/img/autoshow/golf6.jpg",
        "http://img.lichee.top/img/autoshow/golf7.jpg",
        "http://img.lichee.top/img/autoshow/golf8.jpg",
      ],
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
