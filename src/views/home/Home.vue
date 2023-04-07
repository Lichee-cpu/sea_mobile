<!--
 * @Author: lxiang
 * @Date: 2022-06-26 10:57:37
 * @LastEditTime: 2023-04-07 16:00:39
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
        @click="getLocation"
        size="30"
      />
      <span>{{ location }}</span>
    </div>
    <div class="middle">
      <div class="item" @click="goto('Barrage')">弹幕</div>
      <div class="item" @click="goto('AutoShow')">360°</div>
      <div class="item" @click="goto('Chat')">聊天室</div>
      <div class="item" @click="goto('SeaPicker')">横向拉动选择</div>
      <div class="item" @click="goto('Upload')">文件上传</div>
      <div class="item" @click="goto('Pmp')">pmp试题</div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, getCurrentInstance } from "vue";
import { useRouter } from "vue-router";
import Header from "@/components/header/Header.vue";
import { Toast } from "vant";
import WeChat from "@/utils/wechat2";

export default {
  components: {
    Header,
  },
  setup() {
    const value = ref("");
    const router = useRouter();
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
          let lastUpdated = Date.now();
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
    const getLocation = () => {
      if (active.value) {
        active.value = false;
      } else {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            function (position) {
              // 获取到设备的位置信息
              const latitude = position.coords.latitude; // 纬度
              const longitude = Math.abs(position.coords.longitude); // 经度
              active.value = true;
              getAdcode(latitude, longitude);
            },
            function () {
              active.value = false;
              Toast.fail("定位失败");
            }
          );
        } else {
          active.value = false;
          Toast.fail("不支持H5定位");
        }
      }
    };

    // 获取当前位置
    const getWxLocation = async () => {
      if (active.value) {
        active.value = false;
      } else {
        const currentUrl = window.location.href.split("#")[0]; // 获取当前url
        WeChat.init(["getLocation"], currentUrl)
          .then((wx) => {
            wx.getLocation({
              type: "gcj02",
              success: (res) => {
                const lat = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                const lng = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                getAdcode(lat, lng);
                active.value = true;
              },
              fail: () => {
                Toast("获取定位失败");
                active.value = false;
              },
            });
          })
          .catch(() => {
            this.getLocation(); // 微信环境下获取定位失败，使用h5定位
          });
      }
    };

    const goto = (item) => {
      router.push({
        name: item,
      });
    };
    onMounted(() => {
      const locations = JSON.parse(localStorage.getItem("location")); // 获取定位信息
      if (locations) {
        const { lastUpdated, address } = locations;
        location.value = address.replace(/"/g, ""); // 去除双引号
        // 超过2fen钟重新定位
        if (lastUpdated && Date.now() - lastUpdated > 2 * 60 * 1000) {
          if (/MicroMessenger/.test(navigator.userAgent)) {
            getWxLocation(); // 微信环境下获取定位
          } else {
            getLocation(); // 非微信环境下获取定位
          }
        }
      }
    });
    return {
      value,
      isWechat,
      active,
      location,
      goto,
      getWxLocation,
      getLocation,
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
