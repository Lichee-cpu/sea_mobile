<template>
  <div class="wrap">
    <Header title="车展" />
    <div>
      <div ref="drag" class="autoShowBox" @mousemove="mouseHandler">
        <img
          :src="'http://img.lichee.top/img/autoshow/golf' + num + '.jpg'"
          alt=""
        />
      </div>
      {{ num }}
      <input type="range" max="71" min="0" v-model="num" />
    </div>
  </div>
</template>

<script>
import Header from "@/components/header/Header.vue";
import { ref } from "vue";

export default {
  components: { Header },
  setup() {
    const drag = ref(null);
    const num = ref(0);

    return {
      drag,
      num,
    };
  },
};
</script>

<style lang="less" scoped>
.autoShowBox {
  padding-top: var(--nav-bar-height);
  height: 50vh;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
