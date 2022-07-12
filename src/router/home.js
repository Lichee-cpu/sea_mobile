/*
 * @Author: lxiang
 * @Date: 2022-06-26 13:30:35
 * @LastEditTime: 2022-07-12 16:36:13
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
];
