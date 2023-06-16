<!--
 * @Author: lxiang
 * @Date: 2023-06-07 15:20:27
 * @LastEditors: lxiang
 * @LastEditTime: 2023-06-16 09:57:36
 * @description: Modify here please
 * @FilePath: \sea_mobile\src\views\project\metting\index.vue
-->
<template>
  <div class="metting" @click="pos.isDragging = false">
    <!-- 开关 -->
    <div class="switch">
      <div
        :class="[cameraStatus ? 'active' : '', 'camera']"
        @click="handleCamera"
      >
        <div class="camera-icon"></div>
        <div class="camera-text">摄像头</div>
      </div>
      <div
        :class="[screenStatus ? 'active' : '', 'screen']"
        @click="handleScreen"
      >
        <div class="screen-icon"></div>
        <div class="screen-text">共享屏幕</div>
      </div>
    </div>
    <div class="canvas">
      <!-- 共享屏幕 -->
      <div class="screen-box">
        <video src="" ref="screen"></video>
      </div>
      <!-- 摄像头 -->
      <div
        v-show="cameraStatus"
        class="camera-box"
        ref="cameraBox"
        :style="`top:${pos.ypos}px;left:${pos.xpos}px`"
        @mousedown="dragStart"
        @mousemove="drag"
        @mouseup="dragEnd"
      >
        <video src="" ref="camera"></video>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
export default {
  setup() {
    const camera = ref(null); // 摄像头
    const screen = ref(null); // 共享屏幕
    const cameraStatus = ref(false); // 摄像头开关状态
    const screenStatus = ref(false); // 共享屏幕开关状态
    const cameraBox = ref(null); // 摄像头显示模块
    const pos = reactive({
      xpos: 0,
      ypos: 80,
      isDragging: false,
    });

    // 控制摄像头
    const handleCamera = async () => {
      if (!cameraStatus.value) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            audio: false,
            video: { facingMode: "user" },
          });
          camera.value.srcObject = stream; // 将视频流设置为video元素的源
          camera.value.play(); // 播放视频
          cameraStatus.value = !cameraStatus.value;
        } catch (err) {
          console.error(err); // 无法访问用户媒体设备
        }
      } else {
        try {
          camera.value.srcObject.getTracks().forEach((track) => track.stop()); // 停止视频流
          cameraStatus.value = !cameraStatus.value;
        } catch (err) {
          console.error(err);
        }
      }
    };

    // 控制共享屏幕开关
    const handleScreen = async () => {
      if (!screenStatus.value) {
        try {
          const stream = await navigator.mediaDevices.getDisplayMedia({
            audio: false,
            video: { mediaSource: "screen" },
          });
          screen.value.srcObject = stream; // 将视频流设置为video元素的源
          screen.value.play(); // 播放视频
          screenStatus.value = !screenStatus.value;
        } catch (err) {
          console.error(err); // 无法访问用户媒体设备
        }
      } else {
        try {
          screen.value.srcObject.getTracks().forEach((track) => track.stop()); // 停止视频流
          screenStatus.value = !screenStatus.value;
        } catch (err) {
          console.error(err);
        }
      }
    };

    // dragStart
    const dragStart = () => {
      pos.isDragging = true;
    };
    // drag
    const drag = (e) => {
      if (pos.isDragging) {
        pos.xpos += e.movementX;
        pos.ypos += e.movementY;
      }
    };
    //dragEnd
    const dragEnd = () => {
      pos.isDragging = false;
    };

    return {
      camera,
      screen,
      cameraBox,
      cameraStatus,
      screenStatus,
      pos,
      handleCamera,
      handleScreen,
      dragStart,
      drag,
      dragEnd,
    };
  },
};
</script>

<style lang="less" scoped>
.metting {
  height: 100vh;
}
.switch {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 20px;
  .camera,
  .screen {
    width: 30%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border-radius: 8px;
    background-color: var(--tag3);
    color: #ffffff;
  }
  .active {
    background-color: var(--yellow);
  }
}
/* 默认布局 */
.canvas {
  height: calc(~"100% - 80px");
  display: flex;
  justify-content: space-between; /* 在每个项目之间添加间隔 */

  .screen-box {
    padding: 10px;
    margin: 0 5px; /* 项目内部的间隔 */
    // background: var(--teat);
    height: 100%;
    flex: 1;
    video {
      border: 1px solid var(--tag3);
      border-radius: 8px;
      padding: 4px;
      width: 100%;
    }
  }
  .camera-box {
    padding: 10px;
    margin: 0 5px; /* 项目内部的间隔 */
    // background: var(--teat);
    width: 16%;
    video {
      border-radius: 8px;
      width: 100%;
      transform: scaleX(-1);
    }
  }
}
/* 拖拽 */
// .canvas {
//   height: calc(~"100% - 80px");
//   .screen-box {
//     width: 100%;
//     height: 100%;
//     video {
//       width: 100%;
//       max-height: 100%;
//     }
//   }
//   .camera-box {
//     position: fixed;
//     bottom: 8px;
//     left: 8px;
//     height: 200px;
//     cursor: move;
//     z-index: 9;
//     video {
//       height: 100%;
//       transform: scaleX(-1);
//     }
//   }
// }
</style>
