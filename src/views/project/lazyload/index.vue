<!--
 * @Author: lxiang
 * @Date: 2023-05-08 09:04:28
 * @LastEditors: lxiang
 * @LastEditTime: 2023-05-08 11:43:33
 * @description: 懒加载
 * @FilePath: \sea_mobile\src\views\project\lazyload\index.vue
-->
<template>
  <div class="wrap">
    <Header title="懒加载" transparent :nav="true" :defaultNav="true" />
    <van-tabs v-model:active="active" sticky>
      <van-tab title="原生js">
        <LazyLoad v-if="active == 0" />
      </van-tab>
      <van-tab title="vueuse">
        <LazyLoad2 v-if="active == 1" />
      </van-tab>
    </van-tabs>
    <router-view />
  </div>
</template>

<script>
import Header from "@/components/header/Header.vue";
import LazyLoad from "./LazyLoad.vue";
import LazyLoad2 from "./LazyLoad2.vue";
import { ref } from "vue";
export default {
  components: { Header, LazyLoad, LazyLoad2 },
  setup() {
    const active = ref(1);
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
