<!--
 * @Author: lxiang
 * @Date: 2023-08-10 16:59:44
 * @LastEditors: lxiang
 * @LastEditTime: 2023-08-11 16:51:11
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

    const createG = (svg, svgBoxWidth) => {
      const point = [
        {
          x: 0.0,
          y: 1.25,
          color: "#39abf9",
          title: "标题",
          date: "2023/02/02",
          msg: "进入特资",
        },
        {
          x: 0.1,
          y: 1.55,
          color: "#aafg00",
          title: "标题",
          date: "2023/02/02",
          msg: "进入特资",
        },
        {
          x: 0.2,
          y: 1.75,
          color: "#ffaa00",
          title: "标题",
          date: "2023/02/02",
          msg: "进入特资",
        },
        {
          x: 0.3,
          y: 1.85,
          color: "#a12345",
          title: "标题",
          date: "2023/02/02",
          msg: "进入特资",
        },
        {
          x: 0.4,
          y: 1.86,
          color: "#5566aa",
          title: "标题",
          date: "2023/02/02",
          msg: "进入特资",
        },
        {
          x: 0.5,
          y: 1.78,
          color: "#1100ff",
          title: "标题",
          date: "2023/02/02",
          msg: "进入特资",
        },
        {
          x: 0.6,
          y: 1.6,
          color: "#11ff22",
          title: "标题",
          date: "2023/02/02",
          msg: "进入特资",
        },
        {
          x: 0.69,
          y: 1.33,
          color: "#11a345",
          title: "标题",
          date: "2023/02/02",
          msg: "进入特资",
        },
        {
          x: 0.77,
          y: 1.08,
          color: "#a43465",
          title: "标题",
          date: "2023/02/02",
          msg: "进入特资",
        },
      ];

      point.forEach((item) => {
        const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
        const X = svgBoxWidth * 0.1 + 10 + svgBoxWidth * item.x - 60;
        const Y = svgBoxWidth * 0.09 * item.y + 10 - 68;
        g.setAttribute("transform", `translate(${X}, ${Y})`);
        // g.innerHTML = `<circle cx="0" cy="0" r="10" fill="${item.color}"/>`;
        g.innerHTML = `
            <rect x="0" y="0" width="120" height="40" rx="10" ry="10" fill="${item.color}" />
            <text x="60" y="20" text-anchor="middle" alignment-baseline="middle" font-size="14" fill="#ffffff">${item.title}</text>
            <circle cx="60" cy="70" r="10" fill="${item.color}" stroke="#ffffff" stroke-width="3" />
            <text x="60" y="100" text-anchor="middle" alignment-baseline="middle" font-size="14" fill="#4e5969">${item.date}</text>
            <text x="60" y="120" text-anchor="middle" alignment-baseline="middle" font-size="14" fill="#86909c">${item.msg}</text>
        `;
        svg.appendChild(g); // 将demo添加到svg元素中
      });
    };
    const setDraw = () => {
      // 清空svgBox下所有元素
      svgBox.value.innerHTML = "";
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      const svgBoxWidth = svgBox.value.offsetWidth;
      svg.setAttribute("width", svgBoxWidth);
      svg.setAttribute("height", svgBoxWidth * 0.25);

      // 再创建一个svg元素
      const svg2 = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "svg"
      );
      // 设置svg元素的宽高
      svg2.setAttribute("width", svgBoxWidth * 0.8);
      svg2.setAttribute("height", svgBoxWidth * 0.12);
      svg2.setAttribute("x", svgBoxWidth * 0.1);
      svg2.setAttribute("y", svgBoxWidth * 0.09);
      const M = svgBoxWidth * 0.12 * 0.25; // 起点y坐标
      const QX = svgBoxWidth * 0.4; // 控制点x坐标
      const QY = svgBoxWidth * 0.12 * 1.25; // 控制点y坐标
      const END = svgBoxWidth * 0.8 - 10; // 终点x坐标
      svg2.innerHTML = ` <defs>
        <linearGradient id="gradient">
            <stop offset="0%" stop-color="#e1e1e1" />
            <stop offset="100%" stop-color="#bedaff" />
        </linearGradient>
        </defs>
        <!-- 箭头 marker 定义 -->
        <marker id="arrow" viewBox="0 0 8 8" refX="4" refY="4" markerWidth="3" markerHeight="3" orient="auto-start-reverse">
        <path d="M 0 0 L 8 4 L 0 8 z" fill="#bedaff" />
        </marker>
        <path d="M10,${M} Q${QX},${QY} ${END},10" fill="none" stroke="url(#gradient)" stroke-width="8" marker-start="url(#dot)" marker-mid="url(#dot)" marker-end="url(#arrow)" />
      `;
      // 将svg2元素添加到svg元素中
      svg.appendChild(svg2);
      // 将svg元素添加到svgBox中
      svgBox.value.appendChild(svg);
      createG(svg, svgBoxWidth);
    };

    onMounted(() => {
      setTimeout(() => {
        setDraw();
      }, 1000);
      // 监听窗口大小变化
      window.addEventListener("resize", setDraw);
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
