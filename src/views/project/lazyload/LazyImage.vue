<template>
  <img
    src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
    :data-src="src"
    ref="imgRef"
  />
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
    useIntersectionObserver(imgRef, ([{ isIntersecting }], observerElement) => {
      if (isIntersecting) {
        imgRef.value.src = imgRef.value.dataset.src; // 将data-src的值赋给src
        observerElement.unobserve(imgRef.value); // 停止观察
      }
    });

    return {
      imgRef,
    };
  },
};
</script>
