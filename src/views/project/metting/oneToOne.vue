<template>
  <div>
    <div class="videos">
      <div class="local-video">
        <video ref="localVideo" autoplay muted playsinline="">本地窗口</video>
      </div>
      <div class="remote-video">
        <video ref="remoteVideo" autoplay playsinline="">远程窗口</video>
      </div>
    </div>
    <div class="setting">
      <van-icon name="wap-nav" color="#fff" @click="show = !show" />
    </div>

    <van-popup v-model:show="show">
      <div class="room">
        <van-field v-model="roomId" label="房间号" placeholder="请输入房间号" />
        <div class="buttons">
          <van-button type="primary" @click="remove">离开</van-button>
          <van-button type="success" @click="join">加入</van-button>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { onMounted, onUnmounted, ref } from "vue";
import { io } from "socket.io-client";
import { Toast } from "vant";

export default {
  setup() {
    const show = ref(false); // 是否显示弹窗
    const roomId = ref("");
    const localVideo = ref(null);
    const remoteVideo = ref(null);
    const localStream = ref(null); // 本地流
    const remoteStream = ref(null); // 远程流
    const socket = io("wss://car-service.lichee.top/");
    // const socket = io("ws://localhost:8989/");
    const pc = ref(null); // RTCPeerConnection实例

    const join = async () => {
      show.value = false;
      if (!roomId.value) {
        Toast("请输入房间号");
        return;
      }
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: true,
        });
        localVideo.value.srcObject = stream; // 将视频流设置为video元素的源
        localStream.value = stream;
        localVideo.value.play(); // 播放视频
        doJoin(roomId.value);
      } catch (err) {
        Toast("无法访问用户媒体设备");
        console.error(err); // 无法访问用户媒体设备
      }
    };
    const remove = () => {
      show.value = false;
      try {
        localStream.value.getTracks().forEach((track) => track.stop());
        localVideo.value.srcObject = null;
        doLeave(roomId.value);
      } catch (err) {
        console.error("localStream错误", err);
      }
    };

    // 信令
    const SIGNAL_TYPE_JOIN = "join"; // 加入房间
    const SIGNAL_TYPE_RESP_JOIN = "resp_join"; // 加入房间响应
    const SIGNAL_TYPE_LEAVE = "leave"; // 离开房间
    const SIGNAL_TYPE_NEW_PEER = "new_peer"; // 新用户加入房间
    const SIGNAL_TYPE_PEER_LEAVE = "peer_leave"; // 用户离开房间
    const SIGNAL_TYPE_OFFER = "offer";
    const SIGNAL_TYPE_ANSWER = "answer";
    const SIGNAL_TYPE_CANDIDATE = "candidate";
    const loaclUid = ref(Math.random().toString(36).substr(2));
    const remoteUid = ref("");
    const intervalId = ref(null); // 心跳包定时器

    const doJoin = (roomId) => {
      const jsonMsg = {
        cmd: SIGNAL_TYPE_JOIN,
        roomId: roomId,
        uid: loaclUid.value,
      };
      socket.emit("text", JSON.stringify(jsonMsg));
      console.log(new Date().toLocaleTimeString(), "发送加入房间请求", jsonMsg);
    };
    const doLeave = (roomId) => {
      const jsonMsg = {
        cmd: SIGNAL_TYPE_LEAVE,
        roomId: roomId,
        uid: loaclUid.value,
      };
      socket.emit("text", JSON.stringify(jsonMsg));
      console.log(new Date().toLocaleTimeString(), "发送离开房间请求", jsonMsg);
    };

    // 创建对等连接
    const createPeerConnection = (data) => {
      console.log(
        new Date().toLocaleTimeString(),
        "执行createPeerConnection",
        data
      );
      remoteUid.value = data;
      pc.value = new RTCPeerConnection({
        iceTransportPolicy: "relay", //all: 将使用所有网络接口类型，包括relay(中继)和srflx(对称NAT)
        iceServers: [
          {
            urls: "stun:1.15.15.164:3478",
          },
          {
            urls: [
              "turn:1.15.15.164:3478?transport=udp",
              "turn:1.15.15.164:3478?transport=tcp",
            ],
            username: "webrtc",
            credential: "webrtc666",
          },
        ],
      });

      //  ICE协商时收集本地网络接口的信息，并将其打包成一个或多个 "候选者"
      pc.value.onicecandidate = (event) => {
        if (event.candidate) {
          const jsonMsg = {
            cmd: SIGNAL_TYPE_CANDIDATE,
            roomId: roomId.value,
            uid: loaclUid.value,
            remoteUid: remoteUid.value,
            msg: JSON.stringify(event.candidate),
          };
          socket.emit("text", JSON.stringify(jsonMsg));
          console.log(
            new Date().toLocaleTimeString(),
            "发送ICE候选者",
            jsonMsg
          );
        } else {
          console.warn("没有ICE候选者");
        }
      };

      // 一旦远程流到达RTCPeerConnection，将触发此事件
      pc.value.ontrack = (event) => {
        remoteStream.value = event.streams[0];
        remoteVideo.value.srcObject = remoteStream.value;
      };
      // 一旦本地流到达RTCPeerConnection，将触发此事件
      localStream.value.getTracks().forEach((track) => {
        pc.value.addTrack(track, localStream.value);
      });

      // 创建数据通道（心跳）
      const channel = pc.value.createDataChannel("heartbeat", {
        ordered: false, // 不保证数据包顺序
        maxRetransmits: 0, // 不限制重传次数
      }); // 创建数据通道

      channel.onopen = () => {
        intervalId.value = setInterval(() => {
          channel.send(new Uint8Array([0]));
        }, 5000); //定时发送心跳
      };
      channel.onclose = () => {
        if (intervalId.value) clearInterval(intervalId.value);
      };
    };

    const doOffer = (data) => {
      console.log(new Date().toLocaleTimeString(), "执行doOffer", data);
      remoteUid.value = data;
      //创建RTCPeerConnection对象
      if (pc.value == null) {
        createPeerConnection(remoteUid.value);
      }
      pc.value
        .createOffer()
        .then((desc) => {
          pc.value
            .setLocalDescription(desc)
            .then(() => {
              const jsonMsg = {
                cmd: SIGNAL_TYPE_OFFER,
                roomId: roomId.value,
                uid: loaclUid.value,
                remoteUid: remoteUid.value,
                msg: JSON.stringify(desc),
              };
              socket.emit("text", JSON.stringify(jsonMsg));
              console.log(
                new Date().toLocaleTimeString(),
                "发送OFFER",
                jsonMsg
              );
            })
            .catch((err) => {
              console.error("setLocalDescription报错", err);
            });
        })
        .catch((err) => {
          console.error("createOffer报错", err);
        });
    };

    const doAnswer = (data) => {
      console.log(new Date().toLocaleTimeString(), "执行doAnswer", data);
      remoteUid.value = data;
      if (pc.value == null) {
        createPeerConnection(remoteUid.value);
      }
      pc.value
        .createAnswer()
        .then((desc) => {
          pc.value
            .setLocalDescription(desc)
            .then(() => {
              const jsonMsg = {
                cmd: SIGNAL_TYPE_ANSWER,
                roomId: roomId.value,
                uid: loaclUid.value,
                remoteUid: remoteUid.value,
                msg: JSON.stringify(desc),
              };
              socket.emit("text", JSON.stringify(jsonMsg));
              console.log(
                new Date().toLocaleTimeString(),
                "发送ANSWER",
                jsonMsg
              );
            })
            .catch((err) => {
              console.error("setLocalDescription报错", err);
            });
        })
        .catch((err) => {
          console.error("createAnswer报错", err);
        });
    };

    const handleRemoteOffer = (message) => {
      console.log(new Date().toLocaleTimeString(), "处理远程offer", message);
      if (pc.value == null) {
        createPeerConnection(message.remoteUid);
      }
      const desc = new RTCSessionDescription(JSON.parse(message.msg));
      pc.value.setRemoteDescription(desc).then(() => {
        console.info("处理远程setRemoteDescription成功");
      });
      doAnswer(message.uid);
    };

    const handleRemoteAnswer = (message) => {
      console.log(new Date().toLocaleTimeString(), "处理远程answer", message);
      if (pc.value == null) {
        createPeerConnection(message.remoteUid);
      }
      const desc = new RTCSessionDescription(JSON.parse(message.msg));
      pc.value.setRemoteDescription(desc).then(() => {
        console.info("处理远程回答setRemoteDescription成功");
      });
    };

    const handleCandidate = (message) => {
      console.log(
        new Date().toLocaleTimeString(),
        "处理远程ICE候选者",
        message
      );
      const candidate = JSON.parse(message.msg);
      pc.value.addIceCandidate(candidate).catch((err) => {
        console.error("添加ICE失败", err);
      });
    };

    onMounted(() => {
      socket.on("text", (data) => {
        const jsonMsg = JSON.parse(data);
        switch (jsonMsg.cmd) {
          case SIGNAL_TYPE_RESP_JOIN:
            if (jsonMsg.result == "fail") {
              Toast("加入房间失败");
              return;
            } else {
              Toast("加入房间成功");
            }
            console.log(
              new Date().toLocaleTimeString(),
              "发送加入房间请求响应结果",
              jsonMsg.result
            );
            break;
          case SIGNAL_TYPE_NEW_PEER:
            remoteUid.value = jsonMsg.remoteUid;
            console.log(
              new Date().toLocaleTimeString(),
              "有人加入房间",
              jsonMsg
            );
            doOffer(jsonMsg.remoteUid);
            break;

          case SIGNAL_TYPE_LEAVE:
            console.log(
              new Date().toLocaleTimeString(),
              "离开房间响应结果",
              jsonMsg
            );
            if (jsonMsg.result == "fail") {
              Toast(jsonMsg.msg);
              return;
            } else {
              Toast("离开房间成功");
              // 离开成功后断开连接
              pc.value.close();
              pc.value = null;
              remoteVideo.value.srcObject = null; // 关闭远程视频
            }
            break;
          case SIGNAL_TYPE_PEER_LEAVE:
            console.log(
              new Date().toLocaleTimeString(),
              "有人离开房间",
              jsonMsg
            );
            remoteVideo.value.srcObject = null;
            Toast(`用户${jsonMsg.remoteUid}离开房间`);
            pc.value.close();
            pc.value = null;
            remoteVideo.value.srcObject = null;
            break;

          case SIGNAL_TYPE_OFFER:
            handleRemoteOffer(jsonMsg);
            break;
          case SIGNAL_TYPE_ANSWER:
            handleRemoteAnswer(jsonMsg);
            break;
          case SIGNAL_TYPE_CANDIDATE:
            handleCandidate(jsonMsg);
            break;

          default:
            break;
        }
      });
    });

    onUnmounted(() => {
      remove();
    });
    return {
      show,
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
.setting {
  position: fixed;
  padding: 8px;
  border-radius: 50%;
  background: var(--brown);
  top: 32px;
  right: 16px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.room {
  padding: 8px;
  min-width: 300px;
  .buttons {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 16px;
  }
}
.videos {
  video {
    width: 100%;
  }
  .local-video {
    max-width: 100%;
    transform: rotateY(180deg);
    border: 2px solid #15ff00;
    position: relative;
  }
  .local-video::before {
    position: absolute;
    content: "本地视频";
    top: 0;
    left: 0;
    color: #15ff00;
    width: 100%;
    height: 14px;
    transform: rotateY(180deg);
  }
  .remote-video {
    max-width: 100%;
    transform: rotateY(180deg);
    border: 2px solid #ff0000;
    position: relative;
  }
  .remote-video::before {
    position: absolute;
    content: "远程视频";
    top: 0;
    left: 0;
    color: #ff0000;
    width: 100%;
    height: 14px;
    transform: rotateY(180deg);
  }
}
</style>
