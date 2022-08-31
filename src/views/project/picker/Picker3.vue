<template>
  <div>
    <div class="picker-group">
      <div class="picker-row">
        <ul
          @touchstart="touchStart"
          @touchmove="touchMove"
          @touchend="touchEnd"
          class="picker-content"
          :style="
            'transform: rotateY(' +
            option.rotateY +
            'deg);transition:' +
            option.pointerdown +
            ' ease 0s'
          "
        >
          <li
            v-for="(i, o) in state.pickerData"
            :key="o"
            :style="'transform: rotateY(' + o * 45 + 'deg) translateZ(160px); '"
            :class="option.activeItem == o ? 'active' : ''"
          >
            {{ i }}
          </li>
          <li
            :style="
              'transform: rotateY(' +
              Number(option.minX + 45) +
              'deg) translateZ(160px)'
            "
          >
            &nbsp;
          </li>
          <li
            v-if="state.pickerData.length == 6"
            :style="
              'transform: rotateY(' +
              Number(option.minX + 90) +
              'deg) translateZ(160px)'
            "
          >
            &nbsp;
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
      degPx: 0, // 多少px为1度
      maxX: 0, //初始位置也是最大的位置
      minX: 0, //最小的位置
      lastX: 0,
      diffX: 0, // 移动过程中的微小距离变化
      rotateY: 0, //旋转角度
      friction: 0.95, // 摩擦系数
      distanceX: 0, // 滑动距离
      activeItem: 0,
      result: state.pickerData[0],
      item: 0, //监听变化震动
      dataLength: 0,
    });
    /**
     * @description: 初始化
     * @return {*}
     */
    const render = () => {
      option.degPx = 3; // 多少px为1度
      option.dataLength = state.pickerData.length;
      option.maxX = 0; //初始位置也是最大的位置
      option.minX = (option.dataLength - 1) * 45; //最小的位置
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
      option.pointerdown = "none 0s";
    };
    /**
     * @description: 移动
     * @param {*} e
     * @return {*}
     */
    const touchMove = (e) => {
      if (option.isPointerdown) {
        option.diffX = e.touches[0].clientX - option.lastX;
        option.lastX = e.touches[0].clientX;
        option.rotateY += option.diffX / option.degPx;
        if (option.rotateY > option.maxX) {
          option.rotateY = 0;
        } else if (option.rotateY < -option.minX) {
          option.rotateY = -option.minX;
        }

        //震动
        let y = option.rotateY + option.distanceX / option.degPx;
        let item = Math.round((option.rotateY - 0) / 45);
        //跳过边界震动
        if (!(y > option.maxX || y < -option.minX) && item !== option.item) {
          if (navigator.vibrate) navigator.vibrate(20);
          option.item = item;
          option.activeItem = Math.abs(item);
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
        const duration = Math.max(Math.abs(option.distanceX), 300);
        option.pointerdown = "transform " + duration + "ms";
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
      let y = option.rotateY + option.distanceX / option.degPx; // 原始位置与变化位置之和
      if (y > 0) {
        option.rotateY = 0;
      } else if (y < -option.minX - 45) {
        option.rotateY = -option.minX;
      } else {
        option.rotateY = y;
      }
      // 计算停止位置使其为itemWidth的整数倍
      let i = Math.round((option.rotateY - 0) / 45);
      if (Math.abs(i) >= option.dataLength) {
        i = -option.dataLength + 1;
      }
      option.rotateY = i * 45;
      option.activeItem = Math.abs(i);
      option.result = state.pickerData[Math.abs(i)];
      emit("result", option.result);
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
  margin: 0 auto;
  width: 120px;
  height: 30px;
  position: relative;
  .picker-content {
    height: 100%;
    width: 100%;
    position: absolute;
    transform-style: preserve-3d;
  }
}

li {
  display: block;
  position: absolute;
  width: 135px;
  background: #fff;
  font-size: 1em;
  text-align: center;
  color: #000;
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
