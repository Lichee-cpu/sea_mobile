<!--
 * @Author: lxiang
 * @Date: 2023-05-08 09:04:28
 * @LastEditors: lxiang
 * @LastEditTime: 2023-05-08 10:28:30
 * @description: 懒加载
 * @FilePath: \sea_mobile\src\views\project\lazyload\index.vue
-->
<template>
  <div class="wrap">
    <Header title="懒加载" transparent :nav="true" :defaultNav="true" />
    <van-tabs v-model:active="active" sticky>
      <van-tab title="原生js">
        <LazyLoad />
      </van-tab>
      <van-tab title="vueuse">内容 2</van-tab>
    </van-tabs>
    <router-view />
  </div>
</template>

<script>
import Header from "@/components/header/Header.vue";
import LazyLoad from "./LazyLoad.vue";
import { ref } from "vue";
export default {
  components: { Header, LazyLoad },
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
}
</style>
