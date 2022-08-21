/*
 * @Author: lxiang
 * @Date: 2022-06-26 13:30:35
 * @LastEditTime: 2022-08-21 21:02:06
 * @LastEditors: home 1400256031@qq.com
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
];
