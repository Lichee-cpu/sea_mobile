<template>
  <van-config-provider :theme="theme">
    <div class="app-body" :class="theme">
      <router-view></router-view>
    </div>
  </van-config-provider>
</template>

<script>
import { computed } from "@vue/runtime-core";
import { useStore } from "vuex";

export default {
  name: "App",
  setup() {
    const store = useStore();
    // 主题
    const theme = computed(() => {
      return store.state.app.theme;
    });

    // 字体
    const fontSzie = computed(() => {
      return store.state.app.fontSize;
    });
    return { store, fontSzie, theme };
  },
};
</script>


