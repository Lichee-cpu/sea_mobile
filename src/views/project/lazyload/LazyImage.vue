<template>
  <img src="@/assets/login/sea.png" :data-src="src" ref="imgRef" />
</template>

<script>
import { ref } from "vue";
import { useIntersectionObserver } from "@vueuse/core";

export default {
  props: {
    src: String,
  },
  setup() {
    const imgRef = ref(null);
    const defaultImg = require("@/assets/login/sea.png");
    useIntersectionObserver(imgRef, ([{ isIntersecting }], observerElement) => {
      if (isIntersecting) {
        imgRef.value.src = imgRef.value.dataset.src; // 将data-src的值赋给src
        observerElement.unobserve(imgRef.value); // 停止观察
      }
    });

    return {
      imgRef,
      defaultImg,
    };
  },
};
</script>
