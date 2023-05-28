<!--
 * @Author: lxiang
 * @Date: 2023-05-25 11:57:15
 * @LastEditors: lxiang
 * @LastEditTime: 2023-05-28 20:41:06
 * @description: 分发路由
 * @FilePath: \sea_mobile\src\views\web3\web3.vue
-->
<template>
  <component :is="tabList[active].component"></component>
  <van-tabbar v-model="active">
    <van-tabbar-item
      v-for="(tab, index) in tabList"
      :to="tab.path"
      :icon="tab.icon"
      :key="index"
    >
      {{ tab.name }}
    </van-tabbar-item>
  </van-tabbar>
</template>

<script>
import { ref, shallowRef } from "vue";
import TodoList from "@/views/web3/todo.vue";
import Home from "@/views/web3/index.vue";
import Transfer from "@/views/web3/transfer.vue";

export default {
  setup() {
    const active = ref(1);
    const tabList = shallowRef([
      {
        name: "待办",
        icon: "todo-list-o",
        component: TodoList,
      },
      {
        name: "主页",
        icon: "home-o",
        component: Home,
      },
      {
        name: "转账",
        icon: "after-sale",
        component: Transfer,
      },
    ]);

    return { active, tabList };
  },
};
</script>
