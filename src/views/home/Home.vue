<!--
 * @Author: lxiang
 * @Date: 2022-06-26 10:57:37
 * @LastEditTime: 2022-09-13 09:54:42
 * @LastEditors: home 1400256031@qq.com
 * @Description: 主页
 * @FilePath: \sea_mobile\src\views\home\Home.vue
-->

<template>
  <div class="home">
    <Header  transparent :primary="false" />
    <div class="upper">
      <van-search
        v-model="value"
        shape="round"
        placeholder="请输入搜索关键词"
      />
    </div>
    <div class="middle">
      <div class="item" @click="goto('Barrage')">弹幕</div>
      <div class="item" @click="goto('AutoShow')">360°</div>
      <div class="item" @click="goto('Chat')">聊天室</div>
      <div class="item" @click="goto('SeaPicker')">横向拉动选择</div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import Header from "@/components/header/Header.vue";

export default {
  components: {
    Header,
  },
  setup() {
    const value = ref("");
    const router = useRouter();
    const goto = (item) => {
      router.push({
        name: item,
      });
    };
    return { value, goto };
  },
};
</script>
<style lang="less" scoped>
.home{
  padding-top: var(--statusbar-height);
}
.middle {
  padding: 16px;
  /* 声明一个容器 */
  display: grid;
  /* 声明列的宽度,数字3表示的重复3次，即有3列宽度为30%*/
  grid-template-columns: repeat(3, 30%);
  /* 声明行间距和列间距 */
  grid-gap: 10px;
  justify-content: space-around;
  border: 1px solid red;
  margin: 0 16px;
  border-radius: 8px;
  .item {
    padding: 4px 16px;
    border: 1px solid red;
    text-align: center;
    img {
      width: 40%;
    }
  }
}
</style>
