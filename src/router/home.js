/*
 * @Author: lxiang
 * @Date: 2022-06-26 13:30:35
 * @LastEditTime: 2023-03-26 16:03:09
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
];
