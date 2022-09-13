<!--
 * @Author: lxiang
 * @Date: 2022-05-31 10:10:24
 * @LastEditors: home 1400256031@qq.com
 * @LastEditTime: 2022-09-13 09:53:34
 * @description: Modify here please
 * @FilePath: \sea_mobile\src\views\search\Search.vue
-->
<template>
  <div class="search">
    <Header transparent :primary="false" />
    search
  </div>
</template>

<script>
import Header from "@/components/header/Header.vue";

export default {
  components: {
    Header,
  },
};
</script>

<style lang="less" scoped>
.search{
  padding-top: var(--statusbar-height);
}
</style>
