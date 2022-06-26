<!--
 * @Author: lxiang
 * @Date: 2022-05-08 18:58:26
 * @LastEditTime: 2022-06-26 15:23:38
 * @LastEditors: lxiang
 * @Description: 入口
 * @FilePath: \sea_mobile\src\App.vue
-->
<template>
  <van-config-provider :theme="theme">
    <div class="app-body" :class="theme">
      <router-view></router-view>
    </div>
  </van-config-provider>
</template>

<script>
import { computed, provide, ref } from "vue";
import { useStore } from "vuex";
// import router from "./router";
import { useRouter } from "vue-router";

export default {
  name: "App",
  setup() {
    const store = useStore();
    const router = useRouter();
    // 主题
    const theme = computed(() => {
      return store.state.app.theme;
    });

    // 字体
    const fontSzie = computed(() => {
      return store.state.app.fontSize;
    });

    // 返回
    const content = ref(null);

    const getBack = () => {
      if (typeof content.value?.goBack === "function") {
        content.value.goBack();
      } else {
        router.back();
      }
    };
    provide("getBack", getBack);
    return { store, fontSzie, theme, content };
  },
};
</script>
