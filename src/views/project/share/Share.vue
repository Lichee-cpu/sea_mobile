<!--
 * @Author: lxiang
 * @Date: 2023-03-24 11:16:27
 * @LastEditors: lxiang
 * @LastEditTime: 2023-06-27 15:31:22
 * @description: Modify here please
 * @FilePath: \sea_mobile\src\views\project\share\Share.vue
-->
<template>
  <div class="save-img">
    <Header title="长按保存图片" transparent :nav="true" :defaultNav="true" />
    <div class="container" ref="containerDom">
      <div>自定义内容</div>
      <img src="@/assets/login/sea.png" />
    </div>
    <div class="button-group">
      <van-button @click="makePoster" plain type="primary"
        >生成海报
      </van-button>
    </div>
    <van-popup
      v-model:show="showCenter"
      v-if="showCenter"
      round
      style="width: 80%"
    >
      <Poster :posterUrl="posterUrl" />
    </van-popup>
  </div>
</template>

<script>
import Header from "@/components/header/Header.vue";
import html2canvas from "html2canvas";
import { onMounted, onUnmounted, ref } from "vue";
import Poster from "./Poster.vue";
export default {
  name: "Share",
  components: {
    Poster,
    Header,
  },
  setup() {
    const posterUrl = ref(""); // 海报地址
    const containerDom = ref(null); // 海报容器
    const showCenter = ref(false); // 海报弹窗
    /**
     * 生成海报
     */
    const makePoster = () => {
      html2canvas(containerDom.value, {
        allowTaint: true,
        useCORS: true,
        scale: 2,
      }).then((canvas) => {
        const img = canvas.toDataURL("image/png");
        posterUrl.value = img; // 海报地址
        showCenter.value = true; // 海报弹窗
      });
    };

    onMounted(() => {
      document.oncontextmenu = function (e) {
        return e.preventDefault();
      }; // 禁止右键菜单
    });

    onUnmounted(() => {
      document.oncontextmenu = function () {
        return true;
      }; // 恢复右键菜单
    });

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
.save-img {
  padding-top: var(--nav-bar-height);
  background: var(--bg-primary);
}
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
