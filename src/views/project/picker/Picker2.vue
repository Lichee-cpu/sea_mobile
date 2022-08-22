<!--
 * @Author: home 1400256031@qq.com
 * @Date: 2022-08-21 21:00:57
 * @LastEditors: home 1400256031@qq.com
 * @LastEditTime: 2022-08-22 00:38:18
 * @FilePath: \sea_mobile\src\views\project\picker\Picker.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
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
        </ul>
      </div>
    </div>
    {{ state.pickerData[state.standIn] }}
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
      changeNum: 0, //改变的个数
      standIn: 0, //指针
      startPoint: 0, //起始点
      movePoint: 0, //终点
      changePoint: 0, //变化距离
      guodu: 0, // 按下记录充当过渡
    });
    const clickul = () => {
      console.log("点击了ul");
    };
    const setTrans = () => {
      const content = document.querySelector("._picker-content");
      const li = document.querySelector("._picker-row-box");
      const liWidth = li.querySelector("li").offsetWidth;
      const rem = window.getComputedStyle(content, "after").width;

      state.min = rem.replace(/[a-zA-Z]+/g, "");
      state.max = liWidth * (state.pickerData.length - 1) - state.min;
      state.translate = state.min + "px";
      console.log("最大位置", state.max);
    };

    const touchStart = (e) => {
      if (e.pointerType === "mouse" && e.button !== 0) {
        return;
      }
      state.isPointerdown = true;
      state.guodu = Number(state.translate.replace(/[a-zA-Z]+/g, ""));
      state.startPoint = e.touches[0].clientX;
    };

    const touchMove = (e) => {
      if (state.isPointerdown) {
        state.movePoint = e.targetTouches[0].clientX;
        state.changePoint = state.movePoint - state.startPoint; //触摸移动距离
        let newtrans = state.guodu + state.changePoint; //加上原始距离
        console.log(
          "移动距离+触摸距离",
          state.changePoint,
          state.guodu,
          newtrans
        );

        // if (Math.abs(state.changePoint) / 56 > 1) {
        console.log("state.changePoint,", state.changePoint);
        state.changeNum = Math.trunc(state.changePoint / 56); //取整
        console.log("%c state.changeNum %s", "color: red; ", state.changeNum);
        console.log("%c newtrans %s", "color: green; ", newtrans);
        if (newtrans > state.min) {
          state.translate = state.min + "px";
          state.standIn = 0;
        } else if (newtrans < -state.max) {
          state.translate = -state.max + "px";
        } else {
          state.standIn -= state.changeNum;
          console.log("%c索引%s", "color: yellow; ", state.standIn);
          if (Math.abs(state.changeNum) > 0) {
            console.log("大于0", Math.abs(state.changeNum));
          }
        }
        // }
      }
    };
    const touchEnd = () => {
      if (state.translate.replace(/[a-zA-Z]+/g, "") > state.min) {
        state.translate = state.min + "px";
        state.standIn = 0;
      } else if (state.translate.replace(/[a-zA-Z]+/g, "") < -state.max) {
        state.translate = -state.max + "px";
        state.standIn = state.pickerData.length - 1;
      } else {
        state.translate =
          state.changeNum * 56 +
          Number(state.translate.replace(/[a-zA-Z]+/g, "")) +
          "px";
        state.standIn -= state.changeNum;
      }

      console.log(
        "当前索引",
        state.standIn,
        state.translate.replace(/[a-zA-Z]+/g, "")
      );
      console.log(
        "要设置为默认位置了",
        state.translate.replace(/[a-zA-Z]+/g, ""),
        state.min
      );

      state.startPoint = 0;
      state.movePoint = 0;
      state.changeNum = 0;
      state.guodu = 0;
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
