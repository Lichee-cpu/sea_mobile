<!--
 * @Author: lxiang
 * @Date: 2022-05-31 10:10:24
 * @LastEditors: lxiang
 * @LastEditTime: 2023-03-22 16:10:26
 * @description: Modify here please
 * @FilePath: \sea_mobile\src\views\search\Search.vue
-->
<template>
  <div class="search">
    <Header transparent :primary="false" />
    <van-icon
      name="location-o"
      :color="active ? '#0014ff' : ''"
      class="location"
      @click="getLocations"
      size="30"
    />
    <div class="locations">{{ location }}</div>
    <van-button @click="getadd">获取定位</van-button>
  </div>
</template>

<script>
import Header from "@/components/header/Header.vue";
import { Toast } from "vant";
import { onMounted, ref, getCurrentInstance } from "vue";
import WeChat from "@/utils/wechat.js";

export default {
  components: {
    Header,
  },
  setup() {
    const { proxy } = getCurrentInstance();

    const active = ref(false);
    const location = ref("");

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
          const address_component = JSON.stringify(
            res.data.result?.address_component
          ); // 地址信息
          localStorage.setItem(
            "location",
            JSON.stringify({
              lat,
              lng,
              adcode,
              address_component,
            })
          );
          location.value = `纬度：${lat}，经度：${lng}，行政区码:${adcode},地址信息:${address_component}`;
          Toast.success("定位已开启");
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

    /* 企业微信SDK获取定位信息 */
    const getadd = () => {
      WeChat.getLocation()
        .then((position) => {
          const latitude = position.latitude; // 纬度
          const longitude = position.longitude; // 经度
          getAdcode(latitude, longitude);
        })
        .catch(() => {
          Toast.fail("获取位置信息失败");
        });
    };

    onMounted(() => {
      /* h5微信SDK初始化 */
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
    });

    return { active, location, getLocations, getadd };
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
  position: absolute;
  right: 16px;
  top: var(--statusbar-height);
}
.locations {
  padding: 16px;
  margin-top: var(--statusbar-height);
  margin-left: 16px;
}
</style>
