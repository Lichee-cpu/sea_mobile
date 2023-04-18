<!--
 * @Author: lxiang
 * @Date: 2023-04-18 09:39:26
 * @LastEditors: lxiang
 * @LastEditTime: 2023-04-18 16:43:53
 * @description: 审批流程工作台
 * @FilePath: \sea_mobile\src\views\project\approve\Approve.vue
-->
<template>
  <div class="approve">
    <Header title="审批工作台" transparent :nav="true" :defaultNav="true" />
    <div class="item-box">
      <div class="item">提交申请</div>
      <div class="item">待处理</div>
      <div class="item">已处理</div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/header/Header.vue";
export default {
  components: { Header },
  setup() {},
};
</script>

<style lang="less" scoped>
.approve {
  padding-top: var(--nav-bar-height);
  background: var(--group-bg);
  height: 100%;
  .item-box {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 10px;
    .item {
      flex: 1;
      margin: 10px;
      background-color: var(--group-bg2);
      height: 100px;
      border-radius: 10px;
      text-align: center;
      line-height: 100px;
    }
  }
}
</style>
