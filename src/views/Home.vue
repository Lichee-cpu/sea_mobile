<template>
  <h1>{{ $t("home") }}</h1>
  <van-button type="primary" @click="changleLanguage">
    {{ $t("language") }}
  </van-button>
  <br />
  <van-button type="primary" @click="changleSkin">
    {{ $t("skin") }}
  </van-button>
</template>

<script>
import { useI18n } from "vue-i18n/index";
import {useStore} from "vuex";

export default {
  setup() {
    const { locale } = useI18n();
    const store = useStore();
    const changleLanguage = () => {
      locale.value = locale.value == "cn" ? "en" : "cn";
    };
    const changleSkin = () => {
      const skin = store.state.app.theme == "light" ? "dark" : "light";
      store.commit("setTheme", skin);
    };
    return { store, changleLanguage, changleSkin };
  },
};
</script>
