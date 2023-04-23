/*
 * @Author: lxiang
 * @Date: 2023-04-21 09:21:22
 * @LastEditors: lxiang
 * @LastEditTime: 2023-04-23 09:21:11
 * @description: Three.js
 * @FilePath: \sea_mobile\src\router\three.js
 */
export const three = [
  {
    path: "/three",
    name: "Three",
    component: () => import("@/views/threejs/index"),
  },
  {
    path: "/three-1",
    name: "ThreeDemo1",
    component: () => import("@/views/threejs/demo/a"),
  },
  {
    path: "/three-2",
    name: "ThreeDemo2",
    component: () => import("@/views/threejs/demo/b"),
  },
  {
    path: "/three-3",
    name: "ThreeDemo3",
    component: () => import("@/views/threejs/demo/c"),
  },
  {
    path: "/three-4",
    name: "ThreeDemo4",
    component: () => import("@/views/threejs/demo/d"),
  },
  {
    path: "/three-5",
    name: "ThreeDemo5",
    component: () => import("@/views/threejs/demo/e"),
  }, {
    path: "/three-6",
    name: "ThreeDemo6",
    component: () => import("@/views/threejs/demo/f"),
  }, {
    path: "/three-7",
    name: "ThreeDemo7",
    component: () => import("@/views/threejs/demo/g"),
  }, {
    path: "/three-8",
    name: "ThreeDemo8",
    component: () => import("@/views/threejs/demo/h"),
  },
];
