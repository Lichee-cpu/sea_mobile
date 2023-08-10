<!--
 * @Author: lxiang
 * @Date: 2023-08-10 16:59:44
 * @LastEditors: lxiang
 * @LastEditTime: 2023-08-10 17:52:27
 * @description: svg
 * @FilePath: \sea_mobile\src\views\project\test\demo3.vue
-->
<template>
  <div class="box">
    <div class="bg-box">
        <svg xmlns="http://www.w3.org/2000/svg" width="1068" height="278">
            <svg x="120" y="95" width="840" height="120">
                <defs>
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
            </svg>
        <!-- 第一块 -->
        <g transform="translate(117, 65)">
            <rect x="0" y="0" width="120" height="40" rx="10" ry="10" fill="#3964f9" />
            <text x="60" y="20" text-anchor="middle" alignment-baseline="middle" font-size="14" fill="#ffffff">标题一</text>
            <circle cx="60" cy="70" r="10" fill="#3964f9" stroke="#ffffff" stroke-width="3" />
            <text x="60" y="100" text-anchor="middle" alignment-baseline="middle" font-size="14" fill="#4e5969">2023/03/14</text>
            <text x="60" y="120" text-anchor="middle" alignment-baseline="middle" font-size="14" fill="#86909c">进入标题一</text>
        </g>

        <!-- 第二块 -->
        <g transform="translate(349, 106)">
            <rect x="0" y="0" width="120" height="40" rx="10" ry="10" fill="#ff8540" />
            <text x="60" y="20" text-anchor="middle" alignment-baseline="middle" font-size="14" fill="#ffffff">标题一</text>
            <circle cx="60" cy="70" r="10" fill="#ff8540" stroke="#ffffff" stroke-width="3" />
            <text x="60" y="100" text-anchor="middle" alignment-baseline="middle" font-size="14" fill="#4e5969">2023/03/14</text>
            <text x="60" y="120" text-anchor="middle" alignment-baseline="middle" font-size="14" fill="#86909c">进入标题一</text>
        </g>
        <!-- 第三块 -->
        <g transform="translate(607, 99)">
            <rect x="0" y="0" width="120" height="40" rx="10" ry="10" fill="#3964f9" />
            <text x="60" y="20" text-anchor="middle" alignment-baseline="middle" font-size="14" fill="#ffffff">标题一</text>
            <circle cx="60" cy="70" r="10" fill="#3964f9" stroke="#ffffff" stroke-width="3" />
            <text x="60" y="100" text-anchor="middle" alignment-baseline="middle" font-size="14" fill="#4e5969">2023/03/14</text>
            <text x="60" y="120" text-anchor="middle" alignment-baseline="middle" font-size="14" fill="#86909c">进入标题一</text>
        </g>
        <!-- 第四块 -->
        <g transform="translate(817, 57)">
            <rect x="0" y="0" width="120" height="40" rx="10" ry="10" fill="#4fcf7b" />
            <text x="60" y="20" text-anchor="middle" alignment-baseline="middle" font-size="14" fill="#ffffff">标题一</text>
            <circle cx="60" cy="70" r="10" fill="#4fcf7b" stroke="#ffffff" stroke-width="3" />
            <text x="60" y="100" text-anchor="middle" alignment-baseline="middle" font-size="14" fill="#4e5969">2023/03/14</text>
            <text x="60" y="120" text-anchor="middle" alignment-baseline="middle" font-size="14" fill="#86909c">进入标题一</text>
        </g>
        </svg>
    </div>
  </div>
</template>
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
