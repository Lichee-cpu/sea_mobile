<!--
 * @Author: lxiang
 * @Date: 2022-06-26 13:20:00
 * @LastEditTime: 2022-06-26 15:23:58
 * @LastEditors: lxiang
 * @Description: 头部（公共组件）
 * @FilePath: \sea_mobile\src\components\header\Header.vue
-->
<template>
  <van-nav-bar :title="title" left-arrow fixed @click-left="back()">
    <template #right>
      <slot name="right"></slot>
    </template>
  </van-nav-bar>
</template>

<script>
import { inject } from "vue";
export default {
  props: {
    title: String,
  },
  setup(props) {
    const back = inject("getBack");

    return {
      back,
      props,
    };
  },
};
</script>

<style lang="less" scoped>
.header {
  position: fixed;
}
</style>
