<!--
 * @Author: lxiang
 * @Date: 2022-05-16 09:50:42
 * @LastEditors: lxiang
 * @LastEditTime: 2023-03-23 11:57:45
 * @description: 登录页
 * @FilePath: \sea_mobile\src\views\login\Login.vue
-->
<template>
  <div class="login">
    <div class="logo">
      <img src="@/assets/login/sea.png" alt="logo" />
    </div>
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="state.username"
          name="用户名"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="state.password"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
      </van-cell-group>
      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
    <!-- 其他登录方式 -->
    <div class="other-login">
      <div class="other-login-title">其他登录方式</div>
      <div class="other-login-list">
        <van-icon name="smile-o" @click="facePopup" />
        <van-icon name="wechat" @click="wechat" />
      </div>
    </div>
    <!-- 弹出人脸登录 -->
    <van-popup
      v-model:show="faceLogin"
      position="left"
      :style="{ width: '100%', height: '100%' }"
    >
      <FaceLogin />
    </van-popup>
  </div>
</template>

<script>
import { getCurrentInstance, reactive, ref } from "vue";
import { Toast } from "vant";
import router from "../../router";
import FaceLogin from "@/views/login/FaceLogin.vue";
export default {
  components: {
    FaceLogin,
  },
  setup() {
    const state = reactive({
      username: "",
      password: "",
    });
    const { proxy } = getCurrentInstance();
    const onSubmit = () => {
      proxy.$http.post("/api/user/login", state).then((res) => {
        const { status, body, description } = res.data;
        if (status == 200) {
          proxy.$http.setToken(body.token);
          Toast.success(description);
          router.push({ name: "tabbar" });
        } else {
          Toast.fail(description);
        }
      });
    };

    const faceLogin = ref(false);
    const facePopup = () => {
      faceLogin.value = true;
    };

    const wechat = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const urlhash = new URLSearchParams(window.location.hash.split("?")[1]);
      const code = urlParams.get("code") || urlhash.get("code");
      if (!code) return Toast.fail("请在企业微信中打开");
      // router.push({ name: "wxlogin" }); // 跳转到微信登录页获取用户信息
      proxy.$http.post("/api/user/qywxlogin", { code: code }).then((res) => {
        const { status, body, description } = res.data;
        if (status == 200) {
          proxy.$http.setToken(body.token);
          Toast.success(description);
          router.push({ name: "tabbar" });
        } else {
          Toast.fail(description);
        }
      });
    };

    return {
      state,
      onSubmit,
      faceLogin,
      facePopup,
      wechat,
    };
  },
};
</script>
<style lang="less" scoped>
.login {
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
  padding: 16px;
  height: 100%;
  .logo {
    padding: 20% 40% 10% 40%;
    img {
      width: 100%;
    }
  }
}
@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
.other-login {
  margin-top: 20px;
  .other-login-title {
    text-align: center;
    color: #999;
    font-size: 14px;
  }
  .other-login-list {
    display: flex;
    justify-content: center;
    margin-top: 10px;
    .van-icon {
      font-size: 30px;
      margin: 0 10px;
      color: white;
    }
  }
}
</style>
