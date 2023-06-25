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
import { onMounted, ref } from "vue";
import { io } from "socket.io-client";
import { Toast } from "vant";

export default {
  setup() {
    const roomId = ref("");
    const localVideo = ref(null);
    const remoteVideo = ref(null);
    const localStream = ref(null); // 本地流
    const remoteStream = ref(null); // 远程流
    const socket = io("http://car-service.lichee.top/");
    const pc = ref(null); // RTCPeerConnection实例

    const join = async () => {
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
      localStream.value.getTracks().forEach((track) => track.stop());
      localVideo.value.srcObject = null;
      doLeave(roomId.value);
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
    const loaclUid = Math.random().toString(36).substr(2);
    const remoteUid = ref("");

    const doJoin = (roomId) => {
      const jsonMsg = {
        cmd: SIGNAL_TYPE_JOIN,
        roomId: roomId,
        uid: loaclUid,
      };
      socket.emit("text", JSON.stringify(jsonMsg));
    };
    const doLeave = (roomId) => {
      const jsonMsg = {
        cmd: SIGNAL_TYPE_LEAVE,
        roomId: roomId,
        uid: loaclUid,
      };
      socket.emit("text", JSON.stringify(jsonMsg));
    };

    // 创建对等连接
    const createPeerConnection = (data) => {
      remoteUid.value = data;
      pc.value = new RTCPeerConnection();
      pc.value.onicecandidate = (event) => {
        if (event.candidate) {
          const jsonMsg = {
            cmd: SIGNAL_TYPE_CANDIDATE,
            roomId: roomId.value,
            uid: loaclUid,
            remoteUid: remoteUid.value,
            msg: JSON.stringify(event.candidate),
          };
          console.log("有ICE候选者", jsonMsg);
          socket.emit("text", JSON.stringify(jsonMsg));
        } else {
          console.log("没有找到ICE候选者");
        }
      };
      pc.value.ontrack = (event) => {
        remoteStream.value = event.streams[0];
        remoteVideo.value.srcObject = remoteStream.value;
      };
      localStream.value.getTracks().forEach((track) => {
        pc.value.addTrack(track, localStream.value);
      });
      // pc.addTrack(localStream.value.getTracks()[0], localStream.value);// 添加音频轨道
      // pc.addTrack(localStream.value.getTracks()[1], localStream.value);// 添加视频轨道
    };

    const doOffer = (data) => {
      console.log("doOffer", data);
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
                uid: loaclUid,
                remoteUid: remoteUid.value,
                msg: JSON.stringify(desc),
              };
              socket.emit("text", JSON.stringify(jsonMsg));
            })
            .catch((err) => {
              console.error("setLocalDescription报错", err);
            });
        })
        .catch((err) => {
          console.err("createOffer报错", err);
        });
    };

    const doAnswer = (data) => {
      console.log("doAnswer", data);
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
                uid: loaclUid,
                remoteUid: remoteUid.value,
                msg: JSON.stringify(desc),
              };
              socket.emit("text", JSON.stringify(jsonMsg));
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
      console.log("处理远程offer", message);
      if (pc.value == null) {
        createPeerConnection(message.remoteUid);
      }
      const desc = new RTCSessionDescription(JSON.parse(message.msg));
      pc.value.setRemoteDescription(desc).then(() => {
        console.log("处理远程setRemoteDescription成功");
      });
      doAnswer(message.uid);
    };

    const handleRemoteAnswer = (message) => {
      console.log("处理远程回答", message);
      if (pc.value == null) {
        createPeerConnection(message.remoteUid);
      }
      const desc = new RTCSessionDescription(JSON.parse(message.msg));
      pc.value.setRemoteDescription(desc).then(() => {
        console.log("处理远程回答setRemoteDescription成功");
      });
    };

    const handleCandidate = (message) => {
      const candidate = JSON.parse(message.msg);
      pc.value.addIceCandidate(candidate).catch((err) => {
        console.error("添加ICE失败", err);
      });
    };

    onMounted(() => {
      socket.on("text", (data) => {
        const jsonMsg = JSON.parse(data);
        switch (jsonMsg.cmd) {
          case SIGNAL_TYPE_JOIN:
            if (jsonMsg.result == "fail") {
              Toast("加入房间失败");
              return;
            } else {
              Toast("加入房间成功");
            }
            console.log("加入房间", data, jsonMsg);
            break;
          case SIGNAL_TYPE_RESP_JOIN:
            if (jsonMsg.result == "fail") {
              Toast("加入房间失败");
              return;
            } else {
              Toast("加入房间成功");
            }
            console.log("加入房间响应", data, jsonMsg);
            break;
          case SIGNAL_TYPE_LEAVE:
            if (jsonMsg.result == "fail") {
              Toast("房间不存在");
              return;
            } else {
              Toast("离开房间成功");
            }
            break;
          case SIGNAL_TYPE_NEW_PEER:
            remoteUid.value = jsonMsg.remoteUid;
            doOffer(jsonMsg.remoteUid);
            break;
          case SIGNAL_TYPE_PEER_LEAVE:
            Toast(`用户${jsonMsg.remoteUid}离开房间`);
            console.log("用户离开房间响应", data, jsonMsg);
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
