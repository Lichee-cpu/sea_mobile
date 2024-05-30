<template>
  <div>
    <input type="text" v-model="webrtcUrl" placeholder="输入WebRTC URL" style="width: 100%;" />
    <video
      ref="pusher"
      autoplay
      :srcObject="stream"
      style="width: 100%; height: auto"
    />
    <div>
      <h3>播放预览地址</h3>
      <p>播放HTTP-FLV流:</p>
      <ul>
        <li>
          简易播放器:
          <a :href="'https://live.lichee.top/live/bkdbjf.flv'" target="_blank"
            >https://live.lichee.top/live/bkdbjf.flv</a
          >
        </li>
        <li>
          西瓜播放器:
          <a :href="'https://live.lichee.top/live/bkdbjf.flv'" target="_blank"
            >https://live.lichee.top/live/bkdbjf.flv</a
          >
        </li>
      </ul>
      <p>播放HLS流:</p>
      <ul>
        <li>
          简易播放器:
          <a :href="'https://live.lichee.top/live/bkdbjf.m3u8'" target="_blank"
            >https://live.lichee.top/live/bkdbjf.m3u8</a
          >
        </li>
        <li>
          西瓜播放器:
          <a :href="'https://live.lichee.top/live/bkdbjf.m3u8'" target="_blank"
            >https://live.lichee.top/live/bkdbjf.m3u8</a
          >
        </li>
      </ul>
      <p>播放WebRTC流:</p>
      <ul>
        <li> <a :href="'https://live.lichee.top/rtc/v1/whep/?app=live&stream=bkdbjf'" target="_blank"
            >https://live.lichee.top/rtc/v1/whep/?app=live&stream=bkdbjf</a
          ></li>
      </ul>
    </div>
  </div>
</template>

<script>
import Srs from "@/assets/js/srs.sdk";
import { onMounted, ref, onUnmounted, watch, nextTick } from "vue";

export default {
  name: "webrtcPusher",

  setup() {
    const pusher = ref(null); // 使用 null 而不是 undefined
    const webrtcUrl = ref(
      "webrtc://live.lichee.top/live/bkdbjf?secret=c447ab4e83884139907d7cbdaeaf9a6e"
    );

    let rtcPublisher = null; // 用于存储RtcPublisher实例
    let rtcPlayer = null; // 用于存储RtcPlayer实例

    const startPublisher = async () => {
      try {
        // 创建RtcPublisher实例
        rtcPublisher = new Srs.SrsRtcPublisherAsync();
        // 开始推流
        const session = await rtcPublisher.publish(webrtcUrl.value);
        console.log("推流成功", session);

        // 等待DOM更新，确保pusher是可用的
        await nextTick();

        // 如果需要，这里可以添加播放器的初始化代码（如果RtcPublisher也提供了流）
      } catch (error) {
        console.error("推流失败", error);
        // 如果RtcPublisher有close方法，调用它以关闭推流
        if (rtcPublisher && rtcPublisher.close) {
          rtcPublisher.close();
        }
      }
    };

    const startPlayer = async () => {
      try {
        // 创建RtcPlayer实例
        rtcPlayer = new Srs.SrsRtcPlayerAsync();
        // 开始播放
        await rtcPlayer.play(webrtcUrl.value);

        // 等待DOM更新，确保pusher是可用的
        await nextTick();

        // 设置视频源的srcObject
        if (rtcPlayer.stream && pusher.value) {
          pusher.value.srcObject = rtcPlayer.stream;
        }
      } catch (error) {
        console.error("播放失败", error);
        // 如果RtcPlayer有close或stop方法，调用它以停止播放
        if (rtcPlayer && (rtcPlayer.close || rtcPlayer.stop)) {
          // 假设有一个close或stop方法可用
          rtcPlayer.close?.() || rtcPlayer.stop?.();
        }
      }
    };

    onMounted(async () => {
      await startPublisher();
      await startPlayer();
    });

    onUnmounted(() => {
      // 组件卸载时关闭推流和播放
      if (rtcPublisher && rtcPublisher.close) {
        rtcPublisher.close();
      }
      if (rtcPlayer && (rtcPlayer.close || rtcPlayer.stop)) {
        rtcPlayer.close?.() || rtcPlayer.stop?.();
      }
    });

    // 监听webrtcUrl的变化并更新流
    watch(
      webrtcUrl,
      async (newVal) => {
        if (newVal) {
          await startPublisher();
          await startPlayer();
        }
      },
      { immediate: true }
    ); // 立即执行一次以设置初始值

    return { pusher, webrtcUrl };
  },
};
</script>
<style lang="less" scoped>
.mirrored-video {
  transform: scaleX(-1);
  width: 100%;
  height: auto;
}
</style>
