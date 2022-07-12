<!--
 * @Author: lxiang
 * @Date: 2022-07-12 16:30:51
 * @LastEditors: lxiang
 * @LastEditTime: 2022-07-12 17:03:34
 * @description: Modify here please
 * @FilePath: \sea_mobile\src\views\project\chat\Chat.vue
-->
<template>
  <div class="wrap">
    <Header title="聊天" />

    <div>liaotian</div>
    <div>liaotian</div>
    <div>liaotian</div>
    <div>liaotian</div>
    <div>liaotian</div>
  </div>
</template>

<script>
import { onMounted } from "@vue/runtime-core";
import { io } from "socket.io-client";
import Header from "@/components/header/Header.vue";

export default {
  components: { Header },
  setup() {
    onMounted(() => {
      const socket = io("http://localhost:3000");
      socket.emit("findAllDashboard", (res) => {
        console.log(res);
      });
    });
  },
};
</script>
<style lang="less" scoped>
.wrap {
  height: 100%;
  padding-top: var(--nav-bar-height);
}
</style>
