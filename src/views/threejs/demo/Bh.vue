<!--
 * @Author: lxiang
 * @Date: 2023-04-23 08:47:02
 * @LastEditors: lxiang
 * @LastEditTime: 2023-07-31 17:41:48
 * @description: 预览文档
 * @FilePath: \sea_mobile\src\views\threejs\demo\Bh.vue
-->
<template>
  <div class="info">
    <Header :title="title" transparent :nav="true" :defaultNav="true" />
    <input type="text" v-model="Url" />
    <iframe :src="Url" frameborder="0" width="100%"></iframe>
  </div>
</template>

<script setup>
import Header from "@/components/header/Header.vue";
import { useRoute } from "vue-router";

const route = useRoute();
const title = route?.query?.title;
const Url = "https://amarsoft7.github.io/download/H5接入.docx";

</script>
<style lang="less" scoped>
.info {
  padding-top: var(--nav-bar-height);
  background: #e5e5e530;
  height: 100%;
  .box {
    height: 100%;
  }
}
</style>
