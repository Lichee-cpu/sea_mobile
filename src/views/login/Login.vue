<!--
 * @Author: lxiang
 * @Date: 2022-05-16 09:50:42
 * @LastEditors: lxiang
 * @LastEditTime: 2022-05-31 10:17:16
 * @description: Modify here please
 * @FilePath: \sea_mobile\src\views\login\Login.vue
-->
<template>
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
