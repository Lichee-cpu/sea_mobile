<!--
 * @Author: lxiang
 * @Date: 2023-03-15 21:08:34
 * @LastEditors: lxiang
 * @LastEditTime: 2023-03-19 14:11:47
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
import { getCurrentInstance } from "vue";

export default {
  name: "LoginWechat",
  data() {
    return {
      code: "",
      accessToken: "",
      userinfo: {},
    };
  },
  created() {
    const urlParams = new URLSearchParams(window.location.search);
    const urlhash = new URLSearchParams(window.location.hash.split("?")[1]);
    this.code = urlParams.get("code") || urlhash.get("code");
    this.getUserinfo();
  },
  mounted() {},
  methods: {
    getUserinfo() {
      const { proxy } = getCurrentInstance();
      proxy.$http.post(`/user/wxuserinfo`).then((res) => {
        this.userinfo = res.data;
        console.log(res);
      });
    },
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
