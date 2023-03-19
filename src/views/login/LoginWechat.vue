<!--
 * @Author: lxiang
 * @Date: 2023-03-15 21:08:34
 * @LastEditors: lxiang
 * @LastEditTime: 2023-03-19 19:05:22
 * @description: Modify here please
 * @FilePath: \sea_mobile\src\views\login\LoginWechat.vue
-->
<template>
  <div class="login-wechat">
    <div class="login-wechat__title">企业微信登录页</div>
    <div>
      <span>code:</span>
      <span>{{ code }}</span>
    </div>
    <div>
      <span>userinfo:</span>
      <span>{{ userinfo }}</span>
    </div>
  </div>
</template>

<script>
import { getCurrentInstance, ref, onMounted } from "vue";

export default {
  name: "LoginWechat",
  setup() {
    const code = ref("");
    const accessToken = ref("");
    const userinfo = ref({});

    const getUserinfo = () => {
      const { proxy } = getCurrentInstance();
      proxy.$http
        .post("/api/user/wxuserinfo", { code: code.value })
        .then((res) => {
          userinfo.value = res.data;
          console.log(res);
        });
    };

    onMounted(() => {
      const urlParams = new URLSearchParams(window.location.search);
      const urlhash = new URLSearchParams(window.location.hash.split("?")[1]);
      code.value = urlParams.get("code") || urlhash.get("code");
      getUserinfo();
    });

    return {
      code,
      accessToken,
      userinfo,
    };
  },
};
</script>
<style>
.login-wechat {
  width: 100%;
  height: 100%;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.login-wechat__title {
  font-size: 20px;
  color: #333;
}
</style>
