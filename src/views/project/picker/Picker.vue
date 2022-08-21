<!--
 * @Author: home 1400256031@qq.com
 * @Date: 2022-08-21 21:00:57
 * @LastEditors: home 1400256031@qq.com
 * @LastEditTime: 2022-08-22 00:38:18
 * @FilePath: \sea_mobile\src\views\project\picker\Picker.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="_picker-box">
    <div
      class="_picker-content"
      @touchstart="touchStart"
      @touchmove="touchMove"
      @touchend="touchEnd"
    >
      <ul
        @click="clickul"
        class="_picker-row-box"
        :style="
          'transform: translate3d(' +
          state.translate +
          ', 0px, 0px);transition: transform 300ms ease 0s;'
        "
      >
        <li v-for="(i, o) in state.pickerData" :key="o" class="">
          {{ i }}
        </li>
        <li v-for="(i, o) in state.standIn" :key="o" class=""></li>
      </ul>
    </div>
  </div>
</template>

<script>
import { reactive } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
export default {
  setup() {
    const state = reactive({
      pickerData: [
        "12-01",
        "12-02",
        "12-03",
        "12-04",
        "12-05",
        "12-06",
        "12-07",
        "12-08",
        "12-09",
        "12-10",
        "12-11",
        "12-12",
        "12-13",
        "12-14",
        "12-15",
        "12-16",
        "12-17",
        "12-18",
        "12-19",
        "12-20",
      ],
      min: 0,
      max: 0,
      translate: 0,
      isPointerdown: false,
      standIn: 0,
      startPoint: 0,
      movePoint: 0,
      changePoint: 0,
    });
    const clickul = () => {
      console.log("点击了ul");
    };
    const setTrans = () => {
      const content = document.querySelector("._picker-content");
      const li = document.querySelector("._picker-row-box");
      const liWidth = li.querySelector("li").offsetWidth;
      const rem = window.getComputedStyle(content, "after").width;
      state.standIn = Math.trunc(content.offsetWidth / 56 / 2); //替补占位
      state.min = rem.replace(/[a-zA-Z]+/g, "") - 8;
      state.max = liWidth * (state.pickerData.length - 1 - state.standIn);
      state.translate = state.min + "px";
      console.log("zuidawei", state.max);
      console.log("替补", state.standIn);
    };

    const touchStart = (e) => {
      if (e.pointerType === "mouse" && e.button !== 0) {
        return;
      }
      state.isPointerdown = true;
      state.startPoint = e.touches[0].clientX;
    };
    const touchMove = (e) => {
      if (state.isPointerdown) {
        state.movePoint = e.targetTouches[0].clientX;
        state.changePoint = state.movePoint - state.startPoint; //触摸移动距离
        const newtrans =
          Number(state.translate.replace(/[a-zA-Z]+/g, "")) + state.changePoint; //加上原始距离
        const really = Math.ceil(newtrans / 56) * 56; //宽度的倍数，确保每个在中间
        if (newtrans > state.min) {
          state.translate = state.min + "px";
        } else if (newtrans < -state.max) {
          state.translate = -state.max + "px";
        } else {
          state.translate = really + "px";
        }
      }
    };
    const touchEnd = () => {
      state.changePoint = state.movePoint - state.startPoint; //触摸移动距离
      const newtrans =
        Number(state.translate.replace(/[a-zA-Z]+/g, "")) + state.changePoint; //加上原始距离
      const really = Math.ceil(newtrans / 56) * 56; //宽度的倍数，确保每个在中间
      if (newtrans > state.min) {
        state.translate = state.min + "px";
      } else if (newtrans < -state.max) {
        state.translate = -state.max + "px";
      } else {
        state.translate = really + "px";
      }

      console.log(state.movePoint, state.startPoint);
      console.log("state.translate", state.translate);

      state.startPoint = 0;
      state.movePoint = 0;
      state.isPointerdown = false;
    };

    onMounted(() => {
      setTrans();
    });
    return {
      state,
      touchStart,
      touchMove,
      touchEnd,
      clickul,
    };
  },
};
</script>

<style lang="less" scoped>
._picker-box {
  margin-top: 20px;
  height: 50px;
  display: flex;
  align-items: center;
  position: relative;
  border: 1px solid #ebebeb;
}
._picker-content {
  padding: 0.5rem;
  overflow: hidden;
}
._picker-row-box {
  white-space: nowrap;
  li {
    display: inline-block;
    width: 56px;
    text-align: center;
  }
}

._picker-content::before {
  content: "";
  position: absolute;
  display: inline;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 1;
  height: 50px;
  width: calc(~"50% - 28px");
  border-right: 1px solid #ebebeb;
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 0.9),
    rgba(255, 255, 255, 0.6)
  );
}
._picker-content::after {
  content: "";
  position: absolute;
  display: inline;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  height: 50px;
  width: calc(~"50% - 28px");
  border-left: 1px solid #ebebeb;
  background: linear-gradient(
    to left,
    rgba(255, 255, 255, 0.9),
    rgba(255, 255, 255, 0.6)
  );
}
</style>
