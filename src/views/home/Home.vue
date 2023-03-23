<!--
 * @Author: lxiang
 * @Date: 2022-06-26 10:57:37
 * @LastEditTime: 2023-03-23 17:31:52
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
    <div v-if="isWechat">
      <van-icon
        name="location-o"
        :color="active ? '#0fa905' : ''"
        @click="getadd"
        size="30"
      />
      <span>{{ location }}</span>
    </div>
    <div class="middle">
      <div class="item" @click="goto('Barrage')">弹幕</div>
      <div class="item" @click="goto('AutoShow')">360°</div>
      <div class="item" @click="goto('Chat')">聊天室</div>
      <div class="item" @click="goto('SeaPicker')">横向拉动选择</div>
    </div>
  </div>
</template>

<script>
import { ref, inject, onMounted, getCurrentInstance } from "vue";
import { useRouter } from "vue-router";
import Header from "@/components/header/Header.vue";
import { Toast } from "vant";

export default {
  components: {
    Header,
  },
  setup() {
    const value = ref("");
    const router = useRouter();
    const { proxy } = getCurrentInstance();
    const isWechat = /MicroMessenger/.test(navigator.userAgent);
    const wx = isWechat ? inject("$wx") : null;
    const active = ref(false); //是否定位成功
    const location = ref(""); //定位信息

    /* 获取行政区位码 */
    const getAdcode = async (lat, lng) => {
      Toast("获取定位中信息...");
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

    // 获取当前位置
    const getadd = async () => {
      Toast("定位中...");
      wx.openLocation({
        type: "gcj02", // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
        success: function (res) {
          Toast("微信SDK定位中...");
          const latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
          const longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
          getAdcode(latitude, longitude);
        },
        fail: function (err) {
          Toast.fail("定位失败" + err);
        },
      });
    };

    const goto = (item) => {
      router.push({
        name: item,
      });
    };
    onMounted(() => {
      const ua = navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        getadd();
      }
    });
    return { value, isWechat, active, location, goto, getadd };
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
</style>
