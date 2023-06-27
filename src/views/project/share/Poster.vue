<!--
 * @Author: lxiang
 * @Date: 2023-03-24 17:01:40
 * @LastEditors: lxiang
 * @LastEditTime: 2023-03-26 10:57:55
 * @description: Modify here please
 * @FilePath: \sea_mobile\src\views\share\Poster.vue
-->
<template>
  <div class="save">
    <img :src="posterUrl" class="share" />
    <span>长按保存</span>
  </div>
</template>

<script>
import { onMounted, onUnmounted } from "vue";
export default {
  name: "Poster",
  props: {
    posterUrl: {
      type: String,
      default: "",
    },
  },
  setup() {
    // const restoreDefaultContextMenu = (event) => {
    //   event.stopPropagation();
    // };
    // 在组件挂载时添加事件监听器
    onMounted(() => {
      console.log("onMounted");
      // document.addEventListener("contextmenu", restoreDefaultContextMenu);
      document.oncontextmenu = function () {
        return true;
      };
    });
    // 在组件卸载时删除事件监听器
    onUnmounted(() => {
      console.log("onUnmounted");
      // document.removeEventListener("contextmenu", restoreDefaultContextMenu);
      document.oncontextmenu = function (e) {
        return e.preventDefault();
      };
    });
    return {};
  },
};
</script>

<style lang="less" scoped>
.save {
  width: 100%;
  height: 100%;
  background: #dfdfdf;
  padding: 8px;
  text-align: center;
  .share {
    width: 100%;
    height: 100%;
    border-radius: 8px;
    pointer-events: auto; //解除禁止点击事件
  }
}
</style>
