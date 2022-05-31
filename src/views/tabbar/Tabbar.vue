<!--
 * @Author: lxiang
 * @Date: 2022-05-31 09:59:04
 * @LastEditors: lxiang
 * @LastEditTime: 2022-05-31 10:20:58
 * @description: Modify here please
 * @FilePath: \sea_mobile\src\views\tabbar\Tabbar.vue
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
import Home from "@/views/Home.vue";
import Search from "@/views/search/Search.vue";
import Setting from "@/views/setting/Setting.vue";

export default {
  setup() {
    const active = ref(0);
    const tabList = shallowRef([
      {
        name: "home",
        icon: "home-o",
        component: Home,
      },
      {
        name: "search",
        icon: "search",
        component: Search,
      },
      {
        name: "setting",
        icon: "setting-o",
        component: Setting,
      },
    ]);

    return { active, tabList };
  },
};
</script>
