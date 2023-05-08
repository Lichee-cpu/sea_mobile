<!--
 * @Author: lxiang
 * @Date: 2023-05-08 09:04:28
 * @LastEditors: lxiang
 * @LastEditTime: 2023-05-08 10:29:59
 * @description: 原生懒加载
 * @FilePath: \sea_mobile\src\views\project\lazyload\LazyLoad.vue
-->
<template>
  <div>
    <div class="img-box">
      <img
        v-for="item in images"
        :key="item"
        class="img"
        src="@/assets/login/sea.png"
        :data-src="`http://img.lichee.top/img/autoshow/golf${item}.jpg`"
      />
    </div>
  </div>
</template>

<script>
import { onMounted } from "vue";
export default {
  setup() {
    const images = [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25, 26, 27, 28, 29, 30,
    ];
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const lazyImage = entry.target; // 获取当前被观察的元素
          lazyImage.src = lazyImage.dataset.src; // 将data-src的值赋给src
          observer.unobserve(lazyImage); // 停止观察
        }
      });
    });

    onMounted(() => {
      const images = document.querySelectorAll("img"); // 获取所有img元素
      images.forEach((image) => {
        observer.observe(image);
      });
    });
    return { images };
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
