<!--
 * @Author: lxiang
 * @Date: 2022-06-26 13:20:00
 * @LastEditTime: 2023-03-26 16:29:22
 * @LastEditors: lxiang
 * @Description: 头部（公共组件）
 * @FilePath: \sea_mobile\src\components\header\Header.vue
-->
<template>
  <!-- 无标题导航栏 -->
  <div
    v-if="!nav"
    :class="[
      'status-bar',
      transparent ? 'transparent' : '',
      primary ? 'primary-bar' : '',
    ]"
  ></div>
  <!-- 自定义导航栏 -->
  <div v-else-if="!defaultNav"><slot /></div>
  <!-- 标题导航栏 -->
  <div v-else>
    <div v-if="nav" class="title-bar"></div>
    <van-nav-bar :title="title" left-arrow fixed @click-left="back()">
      <template #right>
        <slot name="right"></slot>
      </template>
    </van-nav-bar>
  </div>
</template>

<script>
import { inject } from "vue";
export default {
  props: {
    transparent: Boolean, // 透明
    primary: Boolean, // 主题色
    nav: Boolean, //  是否显示导航栏
    title: String, // 标题
    defaultNav: Boolean, // 是否显示默认导航栏
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
  top: var(--statusbar-height); //距离顶部的距离
}
.title-bar {
  position: fixed;
  height: var(--statusbar-height);
  background: var(--van-nav-bar-background);
  width: 100%;
  top: 0;
  z-index: var(--van-nav-bar-z-index);
}
</style>
