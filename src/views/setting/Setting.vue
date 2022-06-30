<!--
 * @Author: lxiang
 * @Date: 2022-05-31 10:10:54
 * @LastEditors: lxiang
 * @LastEditTime: 2022-06-30 15:27:33
 * @description: Modify here please
 * @FilePath: \sea_mobile\src\views\setting\Setting.vue
-->
<template>
  <div>
    <div>设置中心</div>
    <div>
      <Star />
      <Home />
    </div>
  </div>
</template>

<script>
import Home from "../Home.vue";
import Star from "@/views/project/star/Star.vue";
export default {
  components: {
    Home,
    Star,
  },
  setup() {},
};
</script>
