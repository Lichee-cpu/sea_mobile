<!--
 * @Author: lxiang
 * @Date: 2023-03-31 16:16:34
 * @LastEditors: lxiang
 * @LastEditTime: 2023-05-09 08:50:39
 * @description: 文件上传
 * @FilePath: \sea_mobile\src\views\project\upload\index.vue
-->

<template>
  <div class="uplaod">
    <Header title="文件上传" transparent :nav="true" :defaultNav="true" />
    <van-tabs v-model:active="active" sticky>
      <van-tab title="压缩">
        <Upload />
      </van-tab>
      <van-tab title="分片">
        <UploadSplit />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import Header from "@/components/header/Header.vue";
import { ref } from "vue";
import Upload from "./Upload.vue";
import UploadSplit from "./UploadSplit.vue";
export default {
  components: {
    Header,
    Upload,
    UploadSplit,
  },
  setup() {
    const active = ref(0);
    return { active };
  },
};
</script>

<style lang="less" scoped>
.uplaod {
  padding-top: var(--nav-bar-height);
  height: 100%;
}
.van-tabs {
  z-index: 1;
  height: 100%;
  background-color: var(--group-bg);
}
</style>
