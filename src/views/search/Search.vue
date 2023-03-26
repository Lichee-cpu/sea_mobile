<!--
 * @Author: lxiang
 * @Date: 2022-05-31 10:10:24
 * @LastEditors: lxiang
 * @LastEditTime: 2023-03-26 11:19:06
 * @description: Modify here please
 * @FilePath: \sea_mobile\src\views\search\Search.vue
-->
<template>
  <div class="search">
    <Header transparent :primary="false" />
    <div class="location">
      <van-icon
        v-if="isWechat"
        name="location-o"
        :color="active ? '#0fa905' : ''"
        @click="getadd"
        size="30"
      />
      <van-icon
        v-else
        name="location-o"
        :color="active ? '#0014ff' : ''"
        @click="getLocations"
        size="30"
      />
      <span>{{ location }}</span>
    </div>
    <div>
      <Share />
    </div>
  </div>
</template>

<script>
import Header from "@/components/header/Header.vue";
import { Toast } from "vant";
import { onMounted, ref, getCurrentInstance } from "vue";
import WeChat from "@/utils/initWechat.js";
import Share from "@/views/share/Share.vue";
export default {
  components: {
    Header,
    Share,
  },
  setup() {
    const { proxy } = getCurrentInstance();

    const active = ref(false);
    const location = ref("");
    const isWechat = ref(false); // 是否是微信中打开

    /* 获取行政区位码 */
    const getAdcode = async (lat, lng) => {
      proxy.$http
        .get("/ws/geocoder/v1/", {
          params: {
            location: `${lat},${lng}`,
            key: "OEDBZ-AGQR3-BRF3W-RQH4D-YMRWT-52BPP",
            get_poi: 0,
          },
        })
        .then((res) => {
          const adcode = res.data.result?.ad_info.adcode; // 行政区码
          const address = JSON.stringify(res.data.result?.address); // 地址信息
          localStorage.setItem(
            "location",
            JSON.stringify({
              lat,
              lng,
              adcode,
              address,
            })
          );
          location.value = res.data.result?.address;
        });
    };

    /* h5定位获取定位信息 */
    const getLocations = () => {
      if (active.value) {
        active.value = false;
      } else {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            function (position) {
              // 获取到设备的位置信息
              const latitude = position.coords.latitude; // 纬度
              const longitude = Math.abs(position.coords.longitude); // 经度
              Toast.success("原生H5定位中...");
              getAdcode(latitude, longitude);
            },
            function () {
              active.value = false;
              Toast.fail("定位失败");
            }
          );
        } else {
          Toast.fail("不支持H5定位");
        }
        active.value = true;
      }
    };

    /* 初始化微信SDK */
    const initWechat = () => {
      const currentUrl = window.location.href.split("#")[0];
      proxy.$http
        .post("/api/user/wxticket", { currentUrl: currentUrl })
        .then((res) => {
          const { appId, timestamp, noncestr, signature } = res.data;
          WeChat.init({
            appId: appId,
            timestamp: timestamp,
            nonceStr: noncestr,
            signature: signature,
            jsApiList: [
              "checkJsApi",
              "onMenuShareAppMessage",
              "onMenuShareWechat",
              "onMenuShareTimeline",
              "shareAppMessage",
              "shareWechatMessage",
              "startRecord",
              "stopRecord",
              "onVoiceRecordEnd",
              "playVoice",
              "pauseVoice",
              "stopVoice",
              "uploadVoice",
              "downloadVoice",
              "chooseImage",
              "previewImage",
              "uploadImage",
              "downloadImage",
              "getNetworkType",
              "openLocation",
              "getLocation",
              "hideOptionMenu",
              "showOptionMenu",
              "hideMenuItems",
              "showMenuItems",
              "hideAllNonBaseMenuItem",
              "showAllNonBaseMenuItem",
              "closeWindow",
              "scanQRCode",
              "previewFile",
              "openEnterpriseChat",
              "selectEnterpriseContact",
              "onHistoryBack",
              "openDefaultBrowser",
            ],
          })
            .then(() => {
              Toast.success("初始化成功");
            })
            .catch(() => {
              Toast.fail("初始化失败");
            });
        });
    };

    /* 企业微信SDK获取定位信息 */
    const getadd = () => {
      WeChat.getLocation()
        .then((position) => {
          active.value = true;
          const latitude = position.latitude; // 纬度
          const longitude = position.longitude; // 经度
          Toast.success("微信SDK定位中...");
          getAdcode(latitude, longitude);
        })
        .catch(() => {
          active.value = false;
          Toast.fail("获取位置信息失败");
        });
    };

    onMounted(() => {
      const { lastUpdated, address } = JSON.parse(
        localStorage.getItem("location")
      ); // 获取定位信息
      location.value = address.replace(/"/g, ""); // 去除双引号
      if (lastUpdated && Date.now() - lastUpdated > 5 * 60 * 1000) {
        // 判断是不是微信中打开
        const ua = navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
          initWechat();
          isWechat.value = true;
        } else {
          isWechat.value = false;
        }
      }
    });

    return { active, location, isWechat, getLocations, getadd };
  },
};
</script>

<style lang="less" scoped>
.search {
  padding-top: var(--statusbar-height);
  position: relative;
  height: 100%;
}
.location {
  padding: 8px;
  top: var(--statusbar-height);
  display: flex;
  align-items: center;
  font-size: 14px;
}
</style>
