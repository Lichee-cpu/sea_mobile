<!--
 * @Author: home 1400256031@qq.com
 * @Date: 2022-08-13 09:52:55
 * @LastEditors: lxiang
 * @LastEditTime: 2023-04-18 11:22:01
 * @FilePath: \sea_mobile\src\views\project\auto-show\AutoShow.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="wrap">
    <Header title="车展" transparent :nav="true" :defaultNav="true" />
    <div>
      <div
        ref="drag"
        class="autoShowBox"
        @touchstart="touchStart"
        @touchmove="touchMove"
      >
        <div
          v-for="item in max"
          :key="item"
          class="item-box"
          :style="item == num ? 'opacity:1' : 'opacity:0'"
        >
          <img
            :src="'http://img.lichee.top/img/autoshow/golf' + item + '.jpg'"
            alt=""
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/header/Header.vue";
import { onMounted, reactive, ref } from "vue";

export default {
  components: { Header },
  setup() {
    const drag = ref(null);
    const num = ref(1);
    const max = ref(71);
    const min = ref(1);
    const option = reactive({
      dragWidth: 0, // 拖动元素容器宽度
      startNum: 0, // 初始值
      start: 0,
    });

    const touchStart = (e) => {
      option.start = e.touches[0].clientX; // 记录初始位置
      option.startNum = num.value; // 记录初始值
    };
    const touchMove = (e) => {
      const diffX = e.touches[0].clientX - option.start;
      // 计算距离加多少张图片
      const one = option.dragWidth / 2; //多少占比能够转完一圈
      const page = one / max.value; //移动多少距离转一张图片
      const diffPage = Math.floor(diffX / page); //转了几张图片
      let newNum = option.startNum - diffPage; // 新的值

      // 边界判断
      if (newNum > max.value) {
        option.startNum = min.value;
        newNum = newNum - max.value;
      } else if (newNum < min.value) {
        option.startNum = max.value;
        newNum = newNum + max.value;
      }
      num.value = newNum;
    };

    onMounted(() => {
      option.dragWidth = drag.value.offsetWidth;
    });

    return {
      drag,
      num,
      max,
      min,
      touchStart,
      touchMove,
    };
  },
};
</script>

<style lang="less" scoped>
.autoShowBox {
  padding-top: var(--nav-bar-height);
  position: relative;
  img {
    width: 100%;
    height: 100%;
  }
  .item-box {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }
}
</style>
