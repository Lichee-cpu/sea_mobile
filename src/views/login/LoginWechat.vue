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
    };
  },
  created() {
    const route = useRoute();
    this.code = route.query.code;
    this.getAccessToken();
  },
  mounted() {
    const route = useRoute();
    this.code = route.query.code + "mounted";
  },
  methods: {
    getAccessToken() {
      const { proxy } = getCurrentInstance();
      proxy.$http
        .get(
          "/api/cgi-bin/gettoken?corpid=wwa67bbd475fc10d1f&corpsecret=xnOvejzHmg5A_UaBPPCE0Oau0xHQlJ8XOC3CFL-aA98"
        )
        .then((res) => {
          this.accessToken = res;
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
