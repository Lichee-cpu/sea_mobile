<!--
 * @Author: lxiang
 * @Date: 2022-05-30 17:45:34
 * @LastEditors: lxiang
 * @LastEditTime: 2022-06-30 15:51:22
 * @description: Modify here please
 * @FilePath: \sea_mobile\src\views\Home.vue
-->
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

  <van-button type="primary" @click="close">
    {{ $t("close") }}
  </van-button>

  <van-button type="primary" @click="logout">
    {{ $t("logout") }}
  </van-button>
</template>

<script>
import { useI18n } from "vue-i18n/index";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { getCurrentInstance } from "vue";
import { Dialog, Toast } from "vant";

export default {
  setup() {
    const { locale } = useI18n();
    const store = useStore();
    const router = useRouter();
    const { proxy } = getCurrentInstance();

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
    const logout = () => {
      proxy.$http.post("/user/logout").then(() => {
        login();
      });
    };

    const close = () => {
      Dialog.confirm({
        title: "注销账户",
        message: "注销账户后将无法登录，是否继续？",
      })
        .then(() => {
          proxy.$http.post("/user/close").then((res) => {
            const { description } = res.data;
            Toast.success(description);
          });
          proxy.$http.removeToken();
        })
        .catch(() => {
          // on cancel
        });
    };

    return { store, changleLanguage, changleSkin, login, close, logout };
  },
};
</script>
