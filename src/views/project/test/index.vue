<!--
 * @Author: lxiang
 * @Date: 2023-08-10 09:38:21
 * @LastEditors: lxiang
 * @LastEditTime: 2023-08-10 17:00:50
 * @description: Modify here please
 * @FilePath: \sea_mobile\src\views\project\test\index.vue
-->
<template>
  <div class="img2point">
    <h2>css</h2>
    <demo-1 />
    <h2>js</h2>
    <demo-2 />
    <h2>svg</h2>
    <demo-3 />
    <h2>svg</h2>
    <demo-4 />
  </div>
</template>
<script setup>
import Demo1 from "./demo1.vue";
import Demo2 from "./demo2.vue";
import Demo3 from "./demo3.vue";
import Demo4 from "./demo4.vue";
</script>

<style lang="less" scoped>
.img2point {
  text-align: center;
  padding: 32px;
}
</style>
