/*
 * @Author: lxiang
 * @Date: 2022-05-30 17:45:34
 * @LastEditors: lxiang
 * @LastEditTime: 2023-03-15 21:46:40
 * @description: Modify here please
 * @FilePath: \sea_mobile\src\router\index.js
 */
import { createRouter, createWebHistory } from "vue-router";
import { home } from "./home";
import { login } from "./login";

const routes = [
  {
    name: "home",
    path: "/",
    component: () => import("@/views/tabbar/Tabbar.vue"),
    meta: {
      title: "主页",
    },
  },
  {
    path: "/tabbar",
    name: "tabbar",
    component: () => import("@/views/tabbar/Tabbar.vue"),
    meta: {
      showTab: true,
    },
  },
  ...login,
  ...home,
];
const router = createRouter({
  routes,
  history: createWebHistory(),
});

// 路由守卫
router.beforeEach((to, from, next) => {
  // const token = localStorage.getItem("token");
  // if (!token) {
  //   if (to.name == "login") {
  //     next();
  //   } else {
  //     router.push("login");
  //   }
  // } else {
    next();
  // }
});

export default router;
