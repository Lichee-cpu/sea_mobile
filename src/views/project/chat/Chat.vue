<!--
 * @Author: lxiang
 * @Date: 2022-07-12 16:30:51
 * @LastEditors: lxiang
 * @LastEditTime: 2022-07-13 20:02:19
 * @description: Modify here please
 * @FilePath: \sea_mobile\src\views\project\chat\Chat.vue
-->
<template>
  <div class="wrap">
    <Header title="聊天" />
    <div class="chat-box">
      <div class="chat-info">
        <div v-for="(item, index) in messageList" :key="index">
          <div class="user">
            <span>{{ item.name }}</span>
            <span>{{ item.time }}</span>
          </div>
          <div class="message">{{ item.info }}</div>
        </div>
      </div>
    </div>
    <div class="input">
      <input type="text" />
      <button>发送</button>
    </div>
  </div>
</template>

<script>
import { onMounted } from "@vue/runtime-core";
import { io } from "socket.io-client";
import Header from "@/components/header/Header.vue";

export default {
  components: { Header },
  setup() {
    const messageList = [{ name: "zhang", time: "13:45", info: "章程" }];

    onMounted(() => {
      const socket = io("http://localhost:3000");
      socket.emit("findAllDashboard", (res) => {
        console.log(res);
      });
    });
    return { messageList };
  },
};
</script>
<style lang="less" scoped>
.wrap {
  height: 100%;
  padding-top: var(--nav-bar-height);
  .chat-box {
    height: calc(~"100% - 56px");
    background: #d9d9d9;
    padding: 20px 10px;
    .chat-info {
      height: 100%;
      padding: 8px;
      border-radius: 8px;
      background: #fff;
    }
  }
  .input {
    position: fixed;
    bottom: 10px;
    height: 36px;
    width: 100%;
    text-align: center;
    input {
      height: 100%;
      width: 81%;
      line-height: 80%;
      padding: 2px;
      font-size: 14px;
      box-sizing: border-box;
      border: 1px solid #2f00ff;
    }
    button {
      height: 100%;
      width: 15%;
    }
  }
}
</style>
