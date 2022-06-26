<!--
 * @Author: lxiang
 * @Date: 2022-05-16 09:50:42
 * @LastEditors: lxiang
 * @LastEditTime: 2022-06-26 15:24:14
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
  </div>
</template>

<script>
import { getCurrentInstance, reactive } from "vue";
import { Toast } from "vant";
import router from "../../router";
export default {
  setup() {
    const state = reactive({
      username: "",
      password: "",
    });
    const { proxy } = getCurrentInstance();
    const onSubmit = () => {
      proxy.$http.post("/user/login", state).then((res) => {
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
    };
  },
};
</script>
<style lang="less" scoped>
.login {
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
  height: 100vh;
  padding: 16px;
  .logo {
    padding: 40% 40% 10% 40%;
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
</style>
