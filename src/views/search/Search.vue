<!--
 * @Author: lxiang
 * @Date: 2022-05-31 10:10:24
 * @LastEditors: lxiang
 * @LastEditTime: 2023-06-27 15:59:20
 * @description: Modify here please
 * @FilePath: \sea_mobile\src\views\search\Search.vue
-->
<template>
  <div class="search">
    <Header transparent :primary="false" />
    <h1>Search页面</h1>
  </div>
</template>

<script>
import Header from "@/components/header/Header.vue";
export default {
  components: {
    Header,
  },
  setup() {},
};
</script>

<style lang="less" scoped>
.search {
  padding-top: var(--statusbar-height);
  position: relative;
  height: 100%;
}
</style>
