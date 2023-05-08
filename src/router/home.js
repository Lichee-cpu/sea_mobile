/*
 * @Author: lxiang
 * @Date: 2022-06-26 13:30:35
 * @LastEditTime: 2023-05-08 17:32:33
 * @LastEditors: lxiang
 * @Description: Modify here please
 * @FilePath: \sea_mobile\src\router\home.js
 */
export const home = [
  {
    path: "/barrage",
    name: "Barrage",
    component: () => import("@/views/project/barrage/Barrage.vue"),
  },
  {
    path: "/chat",
    name: "Chat",
    component: () => import("@/views/project/chat/Chat.vue"),
  },
  {
    path: "/auto-show",
    name: "AutoShow",
    component: () => import("@/views/project/auto-show/AutoShow.vue"),
  },
  {
    path: "/sea-picker",
    name: "SeaPicker",
    component: () => import("@/views/project/picker/Picker.vue"),
  },
  {
    path: "/sea-picker2",
    name: "SeaPicker2",
    component: () => import("@/views/project/picker/Picker2.vue"),
  },
  {
    path: "/pmp",
    name: "Pmp",
    component: () => import("@/views/project/pmp/Pmp.vue"),
  },
  {
    path: "/pmp-info",
    name: "PmpInfo",
    component: () => import("@/views/project/pmp/PmpInfo.vue"),
  },
  {
    path: "/upload",
    name: "Upload",
    component: () => import("@/views/project/upload/index.vue"),
  },
  {
    path: "/approve",
    name: "Approve",
    component: () => import("@/views/project/approve/Approve.vue"),
  },
  {
    path: "/lazy-load",
    name: "LazyLoad",
    component: () => import("@/views/project/lazyload/index.vue"),
  },
];
