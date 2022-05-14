<template>
  <h1>{{ $t("home") }}</h1>
  <van-button type="primary" @click="changleLanguage">
    {{ $t("language") }}
  </van-button>
  <br />
  <van-button type="primary" @click="changleSkin">
    {{ $t("skin") }}
  </van-button>

  <van-button type="primary" @click="login">
    {{ $t("login") }}
  </van-button>
</template>

<script>
import { useI18n } from "vue-i18n/index";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  setup() {
    const { locale } = useI18n();
    const store = useStore();
    const router = useRouter();
    const changleLanguage = () => {
      locale.value = locale.value == "cn" ? "en" : "cn";
    };
    const changleSkin = () => {
      const skin = store.state.app.theme == "light" ? "dark" : "light";
      store.commit("setTheme", skin);
    };
    const login = () => {
      router.push({
        name: "login",
      });
    };
    return { store, changleLanguage, changleSkin, login };
  },
};
</script>
