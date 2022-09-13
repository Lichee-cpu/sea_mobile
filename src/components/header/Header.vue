<!--
 * @Author: lxiang
 * @Date: 2022-06-26 13:20:00
 * @LastEditTime: 2022-09-13 09:51:43
 * @LastEditors: home 1400256031@qq.com
 * @Description: 头部（公共组件）
 * @FilePath: \sea_mobile\src\components\header\Header.vue
-->
<template>
  <div
    v-if="!nav"
    :class="[
      'status-bar',
      transparent ? 'transparent' : '',
      primary ? 'primary-bar' : '',
    ]"
  ></div>
  <div v-else-if="!defaultNav"><slot /></div>
  <van-nav-bar v-else :title="title" left-arrow fixed @click-left="back()">
    <template #right>
      <slot name="right"></slot>
    </template>
  </van-nav-bar>
</template>

<script>
import { inject } from "vue";
export default {
  props: {
    transparent: Boolean,
    primary: Boolean,
    nav: Boolean,
    title: String,
    defaultNav: Boolean,
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
.status-bar {
  width: 100%;
  height: var(--statusbar-height);
  position: fixed;
  top: 0;
  background-color: var(--statusbar-bg);
  backdrop-filter: blur(20px);
  z-index: 90;
  transition: all 0.1s ease-out;
}
.transparent-bar {
  background-color: transparent;
  backdrop-filter: none;
}
.primary-bar {
  background-color: aqua;
  backdrop-filter: none;
}
.transparent-nav .van-nav-bar::before {
  background-color: transparent !important;
  backdrop-filter: none;
}
.van-nav-bar--fixed {
  top: var(--statusbar-height);
}
</style>
