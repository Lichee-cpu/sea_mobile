<!--
 * @Author: lxiang
 * @Date: 2022-05-31 10:10:24
 * @LastEditors: lxiang
 * @LastEditTime: 2023-03-22 15:23:57
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

    const getAdcode = async (lat, lng) => {
      return proxy.$http.get("/ws/geocoder/v1/", {
        params: {
          location: `${lat},${lng}`,
          key: "OEDBZ-AGQR3-BRF3W-RQH4D-YMRWT-52BPP",
          get_poi: 0,
        },
      });
    };

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
              const accuracy = position.coords.accuracy; // 精度
              getAdcode(latitude, longitude).then((res) => {
                console.log(res);
                const adcode = res.data.result?.ad_info.adcode; // 行政区码
                const address_component = JSON.stringify(
                  res.data.result?.address_component
                ); // 地址信息
                localStorage.setItem(
                  "location",
                  JSON.stringify({
                    latitude,
                    longitude,
                    accuracy,
                    adcode,
                    address_component,
                  })
                );
                location.value = `纬度：${latitude}，经度：${longitude}，精度：${accuracy},行政区码:${adcode},地址信息:${address_component}`;
                Toast.success("定位已开启");
              });
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

    const getadd = () => {
      Toast("获取用户位置信息");
      WeChat.getLocation()
        .then((location) => {
          console.log("获取到用户位置信息：", location);
          Toast.success("获取用户位置信息成功");
          this.location = location;
        })
        .catch((err) => {
          console.log("获取用户位置信息失败：", err);
          Toast.fail("获取用户位置信息失败");
          // 处理获取位置失败的情况
        });
    };

    onMounted(() => {
      const currentUrl = window.location.href.split("#")[0];
      // 获取ticket
      proxy.$http
        .post("/api/user/wxticket", { currentUrl: currentUrl })
        .then((res) => {
          const { appId, timestamp, noncestr, signature } = res.data;
          Toast("初始化微信" + appId);
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

      const locations = localStorage.getItem("location");
      if (locations) {
        const { latitude, longitude, accuracy, adcode, address_component } =
          JSON.parse(locations);
        location.value = `纬度：${latitude}，经度：${longitude}，精度：${accuracy},行政区码:${adcode},
        地址信息:${address_component}`;
      }
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
