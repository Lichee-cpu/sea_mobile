/*
 * @Author: lxiang
 * @Date: 2022-05-30 17:45:34
 * @LastEditors: lxiang
 * @LastEditTime: 2022-06-26 13:32:04
 * @description: Modify here please
 * @FilePath: \sea_mobile\src\router\index.js
 */
import { createRouter, createWebHashHistory } from "vue-router";
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
  history: createWebHashHistory(),
});

// 路由守卫
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  if (!token) {
    if (to.name == "login") {
      next();
    } else {
      router.push("login");
    }
  } else {
    next();
  }
});

export default router;
