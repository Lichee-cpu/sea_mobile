<!--
 * @Author: lxiang
 * @Date: 2022-07-12 16:30:51
 * @LastEditors: lxiang
 * @LastEditTime: 2022-07-21 16:32:12
 * @description: Modify here please
 * @FilePath: \sea_mobile\src\views\project\chat\Chat.vue
-->
<template>
  <div class="wrap">
    <Header title="聊天" />
    <div class="chat-box">
      <div class="chat-info">
        <div v-for="(item, index) in messageList" :key="index" class="item">
          <div class="user">
            <span>{{ item.name }}</span>
          </div>
          <div class="message">{{ item.message }}</div>
        </div>
      </div>
    </div>
    <div class="input">
      <input type="text" v-model="message" />
      <button @click="send">发送</button>
    </div>
  </div>
</template>

<script>
import { onMounted, onUnmounted } from "@vue/runtime-core";
import { io } from "socket.io-client";
import Header from "@/components/header/Header.vue";
import { getCurrentInstance, reactive, ref } from "vue";
import { Toast } from "vant";

export default {
  components: { Header },
  setup() {
    const socket = io("http://localhost:8989");
    const { proxy } = getCurrentInstance();
    const messageList = reactive([
      { name: "system", time: "00:00", message: "初始化" },
    ]);
    const message = ref("");
    const send = () => {
      if (message.value != "") {
        proxy.$http.post("/chat/send", { message: message.value }).then(() => {
          message.value = "";
        });
      } else {
        Toast("不允许发送空内容");
      }
    };
    onMounted(() => {
      socket.on("send", (res) => {
        res.data.time = new Date(res.data.time).Format("hh:mm");
        messageList.push(res.data);
      });
    });
    onUnmounted(() => {
      socket.off("send", () => {});
    });
    return { messageList, message, send };
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
      .user {
        span {
          margin-right: 10px;
        }
      }
      .message {
        display: inline-block;
        padding: 8px 16px;
        border-radius: 8px;
        background: #d9d9d9;
        margin-left: 36px;
      }
      .item {
        margin-bottom: 5px;
      }
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
