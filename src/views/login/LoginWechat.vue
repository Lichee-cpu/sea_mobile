<!--
 * @Author: lxiang
 * @Date: 2023-03-15 21:08:34
 * @LastEditors: lxiang
 * @LastEditTime: 2023-03-16 08:42:19
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
      <span>accessToken:</span>
      <span>{{ accessToken }}</span>
    </div>
    <div>
      <span>userinfo:</span>
      <span>{{ userinfo }}</span>
    </div>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
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
    const route = useRoute();
    this.code = route?.query?.code;
    this.getAccessToken();
    this.getUserinfo();
  },
  mounted() {},
  methods: {
    getAccessToken() {
      const { proxy } = getCurrentInstance();
      proxy.$http
        .get(
          "/cgi-bin/gettoken?corpid=wwa67bbd475fc10d1f&corpsecret=xnOvejzHmg5A_UaBPPCE0Oau0xHQlJ8XOC3CFL-aA98"
        )
        .then((res) => {
          this.accessToken = res.data?.access_token;
        });
    },
    getUserinfo() {
      const { proxy } = getCurrentInstance();
      proxy.$http
        .get(
          `/cgi-bin/user/getuserinfo?access_token=${this.accessToken}&code=${this.code}`
        )
        .then((res) => {
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
