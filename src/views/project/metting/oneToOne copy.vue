<template>
  <div>
    <div class="buttons">
      <van-field v-model="roomId" label="房间号" placeholder="请输入房间号" />
      <van-button type="success" @click="join">加入</van-button>
      <van-button type="primary" @click="remove">离开</van-button>
    </div>
    <div class="videos">
      <video ref="localVideo" autoplay muted playsinline="">本地窗口</video>
      <video ref="remoteVideo" autoplay muted playsinline="">远程窗口</video>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    const roomId = ref("");
    const localVideo = ref(null);
    const remoteVideo = ref(null);
    const localStream = ref(null);
    var ZeroRTCEngine;
    // 初始化本地流
    const initLocalStream = async () => {
      console.log("初始化本地流");
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: true,
        });
        localVideo.value.srcObject = stream; // 将视频流设置为video元素的源
        localStream.value = stream;
        localVideo.value.play(); // 播放视频
      } catch (err) {
        console.error(err); // 无法访问用户媒体设备
      }
    };

    ZeroRTCEngine = function (wsUrl) {
      this.init(wsUrl);
      ZeroRTCEngine = this;
      return this;
    };
    ZeroRTCEngine.prototype.init = function (wsUrl) {
      // websocket地址
      this.wsUrl = wsUrl;
      this.signaling = null;
    };
    ZeroRTCEngine.prototype.createWebSocket = function () {
      // 创建websocket
      ZeroRTCEngine = this;
      this.signaling = new WebSocket(this.wsUrl);
      this.signaling.onopen = function () {
        console.log("websocket连接成功");
        ZeroRTCEngine.onOpen();
      };
      this.signaling.onmessage = function (event) {
        console.log("收到消息", event.data);
        ZeroRTCEngine.onMessage(event.data);
      };
      this.signaling.onerror = function (event) {
        console.log("websocket连接失败", event);
        ZeroRTCEngine.onError(event);
      };
      this.signaling.onclose = function (event) {
        console.log("websocket连接关闭", event);
        ZeroRTCEngine.onClose(event);
      };
    };
    ZeroRTCEngine.prototype.onOpen = function () {
      console.log("onOpen");
    };
    ZeroRTCEngine.prototype.onMessage = function (data) {
      console.log("onMessage", data);
    };
    ZeroRTCEngine.prototype.onError = function (event) {
      console.log("onError", event);
    };
    ZeroRTCEngine.prototype.onClose = function (event) {
      console.log("onClose", event);
    };

    const ZeroRTCEngined = new ZeroRTCEngine("ws://localhost:8989/socket.io");
    ZeroRTCEngined.createWebSocket();

    const join = () => {
      console.log("加入房间");
      //初始化本地流
      initLocalStream();
    };
    const remove = () => {
      console.log("离开房间");
    };

    return {
      roomId,
      localVideo,
      remoteVideo,
      join,
      remove,
    };
  },
};
</script>
<style lang="less" scoped>
.buttons {
  display: flex;
  justify-content: space-around;
  align-items: center;
  .van-cell {
    width: 30%;
  }
}
</style>
