<!--
 * @Author: lxiang
 * @Date: 2022-06-26 10:57:37
 * @LastEditTime: 2023-03-23 14:51:00
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
        v-if="isWechat"
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
import { ref, getCurrentInstance } from "vue";
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
    const isWechat = ref(false); //是否企微中打开
    const active = ref(false); //是否定位成功
    const { proxy } = getCurrentInstance();

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

    // 获取当前位置
    const getadd = async () => {
      proxy.$wx
        .getLocation()
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

    const goto = (item) => {
      router.push({
        name: item,
      });
    };
    return { value, isWechat, active, goto, getadd };
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
