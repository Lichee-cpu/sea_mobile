<!--
 * @Author: lxiang
 * @Date: 2022-06-26 13:02:26
 * @LastEditTime: 2022-09-13 09:42:00
 * @LastEditors: home 1400256031@qq.com
 * @Description: 弹幕页
 * @FilePath: \sea_mobile\src\views\project\barrage\Barrage.vue
-->
<template>
  <div class="wrap">
    <Header title="弹幕" transparent :nav="true" :defaultNav="true" />
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
