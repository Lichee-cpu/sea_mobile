<!--
 * @Author: lxiang
 * @Date: 2022-06-26 10:57:37
 * @LastEditTime: 2023-08-10 09:36:50
 * @LastEditors: lxiang
 * @Description: 主页
 * @FilePath: \sea_mobile\src\views\home\Home.vue
-->

<template>
  <div class="home">
    <Header transparent :primary="false" />
    <div class="upper">
      <van-search
        v-model="value"
        shape="round"
        placeholder="请输入搜索关键词"
      />
    </div>
    <div class="location">
      <van-icon
        v-if="isWechat"
        name="location-o"
        :color="active ? '#1989fa' : ''"
        @click="getWxLocation"
        size="30"
      />
      <van-icon
        v-else
        name="location-o"
        :color="active ? '#1989fa' : ''"
        @click="getLocations"
        size="30"
      />
      <span>{{ location }}</span>
    </div>
    <div class="middle">
      <div class="item" @click="goto('Barrage')">Barrage</div>
      <div class="item" @click="goto('AutoShow')">car show</div>
      <div class="item" @click="goto('Chat')">chatroom</div>
      <div class="item" @click="goto('SeaPicker')">picker</div>
      <div class="item" @click="goto('Upload')">Upload</div>
      <div class="item" @click="goto('LazyLoad')">LazyLoad</div>
      <div class="item" @click="goto('Pmp')">PMP</div>
      <div class="item" @click="goto('Approve')">approval</div>
      <div class="item" @click="goto('SaveImg')">SaveImg</div>
      <div class="item" @click="goto('Three')">ThreeJs</div>
      <div class="item" @click="goto('Web3')">web3</div>
      <div class="item" @click="goto('Metting')">Metting</div>
      <div class="item" @click="goto('oneTone')">1v1视频</div>
      <div class="item" @click="goto('OnlineRead')">在线预览</div>
      <div class="item" @click="goto('Test')">测试</div>

    </div>
  </div>
</template>

<script>
import { ref, onMounted, getCurrentInstance } from "vue";
import { useRouter } from "vue-router";
import Header from "@/components/header/Header.vue";
import { Toast } from "vant";
import WeChat from "@/utils/initWechat.js";

export default {
  components: {
    Header,
  },
  setup() {
    const value = ref("");
    /* ====== 项目路由跳转 ======*/
    const router = useRouter();
    const goto = (item) => {
      router.push({
        name: item,
      });
    };

    /* ====== 获取定位信息 ======*/
    const { proxy } = getCurrentInstance();
    const isWechat = /MicroMessenger/.test(navigator.userAgent);
    const active = ref(false); //是否定位成功
    const location = ref(""); //定位信息

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
          const lastUpdated = new Date().getTime(); // 最后更新时间
          localStorage.setItem(
            "location",
            JSON.stringify({
              lat,
              lng,
              adcode,
              address,
              lastUpdated,
            })
          );
          location.value = res.data.result?.address;
        });
    };

    /* h5定位获取定位信息 */
    const getLocations = () => {
      if (active.value) {
        active.value = false;
        localStorage.removeItem("location");
        location.value = "";
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
    const getWxLocation = () => {
      if (active.value) {
        active.value = false;
        localStorage.removeItem("location");
        location.value = "";
      } else {
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
      }
    };

    /* 获取定位信息 */
    const setLocattion = () => {
      if (localStorage.getItem("location") || isWechat) {
        const { lastUpdated, address } = JSON.parse(
          localStorage.getItem("location")
        ); // 获取定位信息
        location.value = address.replace(/"/g, ""); // 去除双引号
        active.value = location.value ? true : false;
        if (lastUpdated && Date.now() - lastUpdated > 5 * 60 * 1000) {
          // 判断是不是微信中打开
          const ua = navigator.userAgent.toLowerCase();
          if (ua.match(/MicroMessenger/i) == "micromessenger") {
            initWechat();
            getWxLocation();
          } else {
            getLocations();
          }
        }
      }
    };

    onMounted(() => {
      setLocattion();
    });

    return {
      value,
      isWechat,
      active,
      location,
      goto,
      getWxLocation,
      getLocations,
    };
  },
};
</script>
<style lang="less" scoped>
.home {
  padding-top: var(--statusbar-height);
}
.middle {
  padding: 16px;
  /* 声明一个容器 */
  display: grid;
  /* 声明列的宽度,数字3表示的重复3次，即有3列宽度为30%*/
  grid-template-columns: repeat(3, 30%);
  /* 声明行间距和列间距 */
  grid-gap: 10px;
  justify-content: space-around;
  border: 1px solid red;
  margin: 0 16px;
  border-radius: 8px;
  .item {
    padding: 4px 16px;
    border: 1px solid red;
    text-align: center;
    img {
      width: 40%;
    }
  }
}
.location {
  display: flex;
  align-items: center;
  padding: 8px 16px;
  margin-top: 16px;
  span {
    margin-left: 8px;
  }
}
</style>
