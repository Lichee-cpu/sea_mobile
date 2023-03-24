<template>
  <div class="container" ref="containerDom">
    <div>自定义内容</div>
    <img src="@/assets/login/sea.png" />
  </div>
  <div class="button-group">
    <van-button @click="makePoster" plain type="primary">生成海报 </van-button>
  </div>

  <van-popup v-model:show="showCenter" round style="width: 80%">
    <Poster :posterUrl="posterUrl" />
  </van-popup>
</template>

<script>
import html2canvas from "html2canvas";
import { ref } from "vue";
import Poster from "./Poster.vue";
export default {
  name: "Share",
  components: {
    Poster,
  },
  setup() {
    const posterUrl = ref(""); // 海报地址
    const containerDom = ref(null); // 海报容器
    const showCenter = ref(false); // 海报弹窗
    /**
     * 生成海报
     */
    const makePoster = () => {
      showCenter.value = true; // 海报弹窗
      html2canvas(containerDom.value, {
        allowTaint: true,
        useCORS: true,
        scale: 2,
      }).then((canvas) => {
        const img = canvas.toDataURL("image/png");
        posterUrl.value = img; // 海报地址
      });
    };

    return {
      posterUrl,
      containerDom,
      makePoster,
      showCenter,
    };
  },
};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  background: #fff;
  text-align: center;
}
img {
  width: 80%;
  height: 100%;
  border: 1px solid #dfdfdf;
}
.button-group {
  text-align: center;
}
</style>
