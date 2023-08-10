<!--
 * @Author: lxiang
 * @Date: 2023-08-10 16:59:44
 * @LastEditors: lxiang
 * @LastEditTime: 2023-08-10 18:01:51
 * @description: svg
 * @FilePath: \sea_mobile\src\views\project\test\demo4.vue
-->
<template>
  <div class="box">
    <div class="bg-box" ref="svgBox"></div>
  </div>
</template>
<script>
import { onMounted, ref } from "vue";
export default {
  setup() {
    const svgBox = ref(null);
    const setDraw = () => {
      // 清空svgBox下所有元素
      svgBox.value.innerHTML = "";
      // 创建svg元素
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      // 获取svgBox的宽高
      const svgBoxWidth = svgBox.value.offsetWidth;
      console.log(svgBoxWidth);
      // 设置svg元素的宽高
      svg.setAttribute("width", svgBoxWidth);
      svg.setAttribute("height", svgBoxWidth * 0.26);
      // 再创建一个svg元素
      const svg2 = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "svg"
      );
      // 设置svg元素的宽高
      svg2.setAttribute("width", svgBoxWidth * 0.79);
      svg2.setAttribute("height", svgBoxWidth * 0.12);
      svg2.innerHTML = ` <defs>
        <linearGradient id="gradient">
            <stop offset="0%" stop-color="white" />
            <stop offset="100%" stop-color="#bedaff" />
        </linearGradient>
        </defs>
        <!-- 箭头 marker 定义 -->
        <marker id="arrow" viewBox="0 0 8 8" refX="4" refY="4" markerWidth="3" markerHeight="3" orient="auto-start-reverse">
        <path d="M 0 0 L 8 4 L 0 8 z" fill="#bedaff" />
        </marker>
        <path d="M10,30 Q400,150 830,10" fill="none" stroke="url(#gradient)" stroke-width="8" marker-start="url(#dot)" marker-mid="url(#dot)" marker-end="url(#arrow)" />
      `;
      // 将svg2元素添加到svg元素中
      svg.appendChild(svg2);
      // 将svg元素添加到svgBox中
      svgBox.value.appendChild(svg);
    };

    onMounted(() => {
      setTimeout(() => {
        setDraw();
      }, 1000);
    });

    return {
      svgBox,
    };
  },
};
</script>
<style lang="less" scoped>
.box {
  padding: 32px;
}
.bg-box {
  width: 100%;
  position: relative;
  border: 1px solid #ccc;
}
</style>
