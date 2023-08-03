<template>
  <div class="wrap">
    <Header title="在线预览" transparent :nav="true" :defaultNav="true" />
    <van-tabs v-model:active="active" sticky>
      <van-tab title="dpf">
        <Pdf />
      </van-tab>
      <van-tab title="word">
        <Word />
      </van-tab>
      <van-tab title="excel">
        <Excel />
      </van-tab>
    </van-tabs>
    <router-view />
  </div>
</template>

<script>
import Header from "@/components/header/Header.vue";
import Pdf from "./pdf.vue";
import Word from "./word.vue";
import Excel from "./excel.vue";

import { ref } from "vue";
export default {
  components: { Header, Pdf, Word, Excel },
  setup() {
    const active = ref(0);
    return { active };
  },
};
</script>

<style lang="less" scoped>
.wrap {
  height: 100%;
  position: relative;
  padding-top: var(--nav-bar-height);
}
.van-tabs {
  z-index: 1;
  background-color: var(--group-bg);
}
</style>
