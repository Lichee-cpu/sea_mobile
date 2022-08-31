<template>
  <div>
    <div class="picker-group">
      <div
        class="picker-row"
        @touchstart="touchStart"
        @touchmove="touchMove"
        @touchend="touchEnd"
      >
        <ul
          class="picker-content"
          :style="
            'transform: translate3d(' +
            option.translateX +
            'px, 0px, 0px);display: flex;transition:' +
            option.pointerdown +
            ' ease 0s'
          "
        >
          <li
            v-for="(i, o) in state.pickerData"
            :key="o"
            :class="option.activeItem == o ? 'active' : ''"
          >
            {{ i }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
export default {
  props: {
    pickerData: {
      typeof: Array,
      default: () => {
        return [];
      },
    },
  },
  setup(props, { emit }) {
    const state = reactive({
      pickerData: props.pickerData,
    });
    const option = reactive({
      isPointerdown: false,
      pointerdown: "transform 300ms",
      ul: null,
      pickerRow: null,
      itemWidth: 56, // 列表项宽度
      pseudoWidth: 0, //伪元素宽度
      maxX: 0, //初始位置也是最大的位置
      minX: 0, //最小的位置
      lastX: 0,
      diffX: 0,
      translateX: 0, // 当前位置
      friction: 0.95, // 摩擦系数
      distanceX: 0, // 滑动距离
      activeItem: 0,
      result: state.pickerData[0],
      item: 0, //监听变化震动
    });
    /**
     * @description: 初始化
     * @return {*}
     */
    const render = () => {
      option.ul = document.querySelector(".picker-content");
      option.pickerRow = document.querySelector(".picker-row");
      option.itemWidth = option.ul.querySelector("li").offsetWidth; // 列表项宽度
      option.pseudoWidth = window.getComputedStyle(
        option.pickerRow,
        "after"
      ).width; //伪元素宽度
      option.maxX = option.pseudoWidth.replace(/[a-zA-Z]+/g, ""); //初始位置也是最大的位置
      option.minX =
        option.itemWidth * (state.pickerData.length - 1) - option.maxX; //最小的位置
      option.translateX = option.maxX;
      emit("result", option.result);
    };

    /**
     * @description: 点击
     * @param {*} e
     * @return {*}
     */
    const touchStart = (e) => {
      option.isPointerdown = true;
      option.lastX = e.touches[0].clientX;
      option.diffX = 0;
      option.distanceX = 0;
      getTransform();
    };
    /**
     * @description: 移动
     * @param {*} e
     * @return {*}
     */
    const touchMove = (e) => {
      if (option.isPointerdown) {
        option.diffX = e.touches[0].clientX - option.lastX;
        option.translateX += option.diffX;
        option.lastX = e.touches[0].clientX;

        //震动操作
        let y = option.translateX + option.distanceX;
        let item = Math.round(
          (option.translateX - option.maxX) / option.itemWidth
        );
        //跳过边界震动
        if (!(y > option.maxX || y < -option.minX) && item !== option.item) {
          navigator.vibrate(20);
          option.item = item;
        }
      }
    };
    /**
     * @description: 结束
     * @param {*} e
     * @return {*}
     */
    const touchEnd = () => {
      if (option.isPointerdown) {
        option.isPointerdown = false;
        getTranslateX();

        // 滑动距离与时长成正比且最短时长为300ms
        const duration = Math.max(Math.abs(option.distanceX) * 1.5, 300);
        option.ul.style.transition = "transform " + duration + "ms ease";
        option.pointerdown = "transform 300ms";
      }
    };

    /**
     * @description: 设置位置及返回数据
     * @return {*}
     */
    const getTranslateX = () => {
      let speed = option.diffX;
      while (Math.abs(speed) > 1) {
        speed *= option.friction;
        option.distanceX += speed;
      }
      // 边界判断
      let y = option.translateX + option.distanceX;
      if (y > option.maxX) {
        option.translateX = option.maxX;
        option.distanceX = option.maxX - option.translateX;
      } else if (y < -option.minX) {
        option.translateX = -option.minX;
        option.distanceX = option.minX - option.translateX;
      } else {
        option.translateX = y;
      }

      // 计算停止位置使其为itemWidth的整数倍
      let i = Math.round((option.translateX - option.maxX) / option.itemWidth);
      option.translateX = Number(option.maxX) + Number(i * option.itemWidth);
      option.activeItem = Math.abs(i);
      option.result = state.pickerData[Math.abs(i)];

      emit("result", option.result);
    };
    /**
     * @description: 设点击时初始位置
     * @return {*}
     */
    const getTransform = () => {
      const transform = window
        .getComputedStyle(option.ul)
        .getPropertyValue("transform");
      option.translateX = parseFloat(transform.split(",")[4]);
      option.pointerdown = "none 0s";
    };

    onMounted(() => {
      render();
    });

    return { state, option, touchStart, touchMove, touchEnd };
  },
};
</script>

<style lang="less" scoped>
.picker-group {
  display: flex;
}

.picker-row {
  position: relative;
  flex: 1;
  margin: auto 0;
  overflow: hidden;
  touch-action: none;
  display: flex;
}

.picker-row::before {
  content: "";
  position: absolute;
  display: inline;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 1;
  width: calc(~"50% - 28px");
  border-right: 1px solid #ebebeb;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.6),
    rgba(255, 255, 255, 0.9)
  );
}

.picker-row::after {
  content: "";
  position: absolute;
  display: inline;
  bottom: 0;
  right: 0;
  top: 0;
  z-index: 1;
  width: calc(~"50% - 28px");
  border-left: 1px solid #ebebeb;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.9),
    rgba(255, 255, 255, 0.6)
  );
}

li {
  list-style: none;
  font-size: 14px;
  width: 56px;
  line-height: 20px;
  text-align: center;
}
.active {
  font-size: 16px;
  font-weight: 700;
}

.btn-sure {
  display: block;
  margin: 15px auto 0;
}
</style>
