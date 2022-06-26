<!--
 * @Author: lxiang
 * @Date: 2022-06-26 13:02:26
 * @LastEditTime: 2022-06-26 14:35:50
 * @LastEditors: lxiang
 * @Description: 弹幕页
 * @FilePath: \sea_mobile\src\views\project\barrage\Barrage.vue
-->
<template>
  <div class="wrap">
    <Header title="弹幕" />
    <div class="barrage-box">
      <BarrageInfo />
    </div>
  </div>
</template>
<script>
import Header from "@/components/header/Header.vue";
import BarrageInfo from "./BarrageInfo.vue";
export default {
  components: { Header, BarrageInfo },
  setup() {},
};
</script>

<style lang="less" scoped>
.wrap {
  height: 100%;
  padding-top: var(--nav-bar-height);
}
.barrage-box {
  width: 100%;
}
</style>
