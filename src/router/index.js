import { createRouter, createWebHashHistory } from "vue-router";
import { login } from "./login";

const routes = [
  {
    name: "home",
    path: "/",
    component: () => import("@/views/Home"),
    meta: {
      title: "主页",
    },
  },
  ...login,
];
const router = createRouter({
  routes,
  history: createWebHashHistory(),
});

// router.beforeEach((to, from, next) => {
//   const title = to.meta && to.meta.title;
//   if (title) {
//     document.title = title;
//   }
//   next();
// });

export default router;
