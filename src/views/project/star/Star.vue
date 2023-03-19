<!--
 * @Author: lxiang
 * @Date: 2022-06-30 15:04:49
 * @LastEditors: lxiang
 * @LastEditTime: 2023-03-09 11:03:28
 * @description: Modify here please
 * @FilePath: \sea_mobile\src\views\project\star\Star.vue
-->
<template>
  <div class="star-box">
    <div>
      <span>
        {{ follow }}
        关注
      </span>
    </div>
    <div>
      <span>
        {{ myfan }}
        粉丝
      </span>
    </div>
  </div>
</template>
<script>
import { getCurrentInstance, onMounted, ref } from "vue";

export default {
  setup() {
    const { proxy } = getCurrentInstance();
    const myfan = ref(0);
    const follow = ref(0);
    const getUserInfo = () => {
      proxy.$http.post("/api/user/userinfo").then((res) => {
        const data = res.data.message;
        console.log(data);
        myfan.value = data.fan;
        follow.value = data.follow;
      });
    };

    onMounted(() => {
      getUserInfo();
    });
    return {
      follow,
      myfan,
    };
  },
};
</script>

<style lang="less" scoped>
.star-box {
  display: flex;
  justify-content: space-around;
  padding: 16px;
}
</style>
