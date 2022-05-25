/*
 * @Author: lxiang
 * @Date: 2022-05-16 09:50:42
 * @LastEditors: lxiang
 * @LastEditTime: 2022-05-25 19:23:02
 * @description: Modify here please
 * @FilePath: \sea_mobile\src\router\index.js
 */
import { createRouter, createWebHashHistory } from 'vue-router'
import { login } from './login'

const routes = [
  {
    name: 'home',
    path: '/',
    component: () => import('@/views/Home'),
    meta: {
      title: '主页',
    },
  },
  {
    path: '/upload',
    name: 'upload',
    component: () => import('@/components/upload/Uplaod.vue'),
  },
  ...login,
]
const router = createRouter({
  routes,
  history: createWebHashHistory(),
})

// router.beforeEach((to, from, next) => {
//   const title = to.meta && to.meta.title;
//   if (title) {
//     document.title = title;
//   }
//   next();
// });

export default router
