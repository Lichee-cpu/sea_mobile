<!--
 * @Author: lxiang
 * @Date: 2022-06-26 10:57:37
 * @LastEditTime: 2022-07-12 16:35:37
 * @LastEditors: lxiang
 * @Description: 主页
 * @FilePath: \sea_mobile\src\views\home\Home.vue
-->

<template>
  <div>
    <div class="upper">
      <van-search
        v-model="value"
        shape="round"
        placeholder="请输入搜索关键词"
      />
    </div>
    <div class="middle">
      <div class="item">
        <img
          src="@/assets/home/item/danmu.png"
          alt="弹幕"
          @click="goto('Barrage')"
        />
      </div>
      <div class="item">
        <img src="@/assets/home/item/360.png" alt="全景" />
      </div>
      <div class="item">
        <img
          src="@/assets/home/item/liaotian.png"
          alt="聊天"
          @click="goto('Chat')"
        />
      </div>
      <div class="item">
        <img src="@/assets/home/item/upload.png" alt="文件上传" />
      </div>
    </div>
    <div class="lower"></div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
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
