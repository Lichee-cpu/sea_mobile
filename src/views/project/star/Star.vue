<!--
 * @Author: lxiang
 * @Date: 2022-06-30 15:04:49
 * @LastEditors: lxiang
 * @LastEditTime: 2022-06-30 15:54:32
 * @description: Modify here please
 * @FilePath: \sea_mobile\src\views\project\star\Star.vue
-->
<template>
  <div class="star-box">
    <div>
      <span>
        {{ myattention }}
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
    const myattention = ref(0);
    const getMyattention = () => {
      proxy.$http.post("/star/myattention").then((res) => {
        const data = res.data.message;
        console.log(data[0].froms);
        myattention.value = data[0].froms.length;
      });
    };
    const getMyfan = () => {
      proxy.$http.post("/star/myfan").then((res) => {
        const data = res.data.message;
        console.log(data[0].tolist);
        myfan.value = data[0].tolist.length;
      });
    };
    onMounted(() => {
      getMyattention();
      getMyfan();
    });
    return {
      myattention,
      myfan,
    };
  },
};
</script>

<style lang="less" scoped>
.star-box {
  display: flex;
  justify-content: space-around;
}
</style>
