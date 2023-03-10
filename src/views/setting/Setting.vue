<!--
 * @Author: lxiang
 * @Date: 2022-05-31 10:10:54
 * @LastEditors: lxiang
 * @LastEditTime: 2023-03-10 13:46:22
 * @description: Modify here please
 * @FilePath: \sea_mobile\src\views\setting\Setting.vue
-->
<template>
  <div>
    <Star />
    <div class="face">
      <face-login />
    </div>
    <div class="setting">
      <van-cell-group inset>
        <van-field
          :label="$t('language')"
          @click="changleLanguage"
          readonly
          is-link
        />
        <van-field :label="$t('skin')" @click="changleSkin" readonly is-link />
        <van-field :label="$t('login')" @click="login" readonly is-link />
        <van-field :label="$t('close')" @click="close" readonly is-link />
        <van-field :label="$t('logout')" @click="logout" readonly is-link />
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import { useI18n } from "vue-i18n/index";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { getCurrentInstance } from "vue";
import { Dialog, Toast } from "vant";
import Star from "@/views/project/star/Star.vue";
import FaceLogin from "@/views/login/FaceLogin.vue";
export default {
  components: {
    Star,
    FaceLogin,
  },
  setup() {
    const { locale } = useI18n();
    const store = useStore();
    const router = useRouter();
    const { proxy } = getCurrentInstance();

    // 切换语言
    const changleLanguage = () => {
      locale.value = locale.value == "cn" ? "en" : "cn";
    };
    // 切换皮肤
    const changleSkin = () => {
      const skin = store.state.app.theme == "light" ? "dark" : "light";
      store.commit("setTheme", skin);
    };
    // 登录
    const login = () => {
      router.push({
        name: "login",
      });
    };
    // 退出登录
    const logout = () => {
      proxy.$http.post("/user/logout").then(() => {
        login();
      });
    };
    // 销户
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

<style lang="less" scoped>
.setting {
  margin-top: 20px;
}
.face {
  height: 200px;
}
</style>
