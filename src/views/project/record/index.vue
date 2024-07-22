
<template>
    <div class="record">
      <Header title="双录" transparent :nav="true" :defaultNav="true" />
      <van-tabs v-model:active="active" sticky>
        <van-tab title="常规">
          <Record />
        </van-tab>
        <van-tab title="webm">
          <RecordWebm />
        </van-tab>
        <van-tab title="canvas">
          <RecordCanvas />
        </van-tab>
        <van-tab title="OA">
          <RecordJem />
        </van-tab>
      </van-tabs>
    </div>
  </template>
  
  <script>
  import Header from "@/components/header/Header.vue";
  import { ref } from "vue";
  import Record from "./Record.vue";
  import RecordWebm from "./RecordWebm.vue";
  import RecordCanvas from "./RecordCanvas.vue"
  import RecordJem from "./RecordJem.vue"
  export default {
    components: {
      Header,
      Record,
      RecordWebm,
      RecordCanvas,
      RecordJem
    },
    setup() {
      const active = ref(0);
      return { active };
    },
  };
  </script>
  
  <style lang="less" scoped>
  .record {
    padding-top: var(--nav-bar-height);
    height: 100%;
  }
  .van-tabs {
    z-index: 1;
    height: 100%;
    background-color: var(--group-bg);
  }
  </style>
  