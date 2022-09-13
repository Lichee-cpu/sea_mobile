<!--
 * @Author: home 1400256031@qq.com
 * @Date: 2022-08-13 09:52:55
 * @LastEditors: home 1400256031@qq.com
 * @LastEditTime: 2022-09-13 09:42:10
 * @FilePath: \sea_mobile\src\views\project\auto-show\AutoShow.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="wrap">
    <Header title="车展" transparent :nav="true" :defaultNav="true" />
    <div>
      <div ref="drag" class="autoShowBox" @mousemove="mouseHandler">
        <img
          :src="'http://img.lichee.top/img/autoshow/golf' + num + '.jpg'"
          alt=""
        />
      </div>
      {{ num }}
      <input type="range" max="71" min="0" v-model="num" />
    </div>
  </div>
</template>

<script>
import Header from "@/components/header/Header.vue";
import { ref } from "vue";

export default {
  components: { Header },
  setup() {
    const drag = ref(null);
    const num = ref(0);

    return {
      drag,
      num,
    };
  },
};
</script>

<style lang="less" scoped>
.autoShowBox {
  padding-top: var(--nav-bar-height);
  height: 50vh;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
