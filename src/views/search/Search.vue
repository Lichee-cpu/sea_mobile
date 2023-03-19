<!--
 * @Author: lxiang
 * @Date: 2022-05-31 10:10:24
 * @LastEditors: lxiang
 * @LastEditTime: 2023-03-19 21:08:27
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
      @click="getLocation"
      size="30"
    />
    <div class="locations">{{ location }}</div>
  </div>
</template>

<script>
import Header from "@/components/header/Header.vue";
import { Toast } from "vant";
import { onMounted, ref } from "vue";

export default {
  components: {
    Header,
  },
  setup() {
    const active = ref(false);
    const location = ref("");
    const getLocation = () => {
      if (active.value) {
        active.value = false;
      } else {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            function (position) {
              // 获取到设备的位置信息
              const latitude = position.coords.latitude; // 纬度
              const longitude = position.coords.longitude; // 经度
              const accuracy = position.coords.accuracy; // 精度
              localStorage.setItem(
                "location",
                JSON.stringify({ latitude, longitude, accuracy })
              );
              location.value = `纬度：${latitude}，经度：${longitude}，精度：${accuracy}`;
              Toast.success("定位已开启");
            },
            function (error) {
              // 获取设备位置信息失败
              if (error.code == error.PERMISSION_DENIED) {
                // 用户拒绝了定位请求，需要再次请求定位权限
                navigator.geolocation.getCurrentPosition(
                  function (position) {
                    // 获取到设备的位置信息
                    var latitude = position.coords.latitude; // 纬度
                    var longitude = position.coords.longitude; // 经度
                    var accuracy = position.coords.accuracy; // 精度
                    localStorage.setItem(
                      "location",
                      JSON.stringify({ latitude, longitude, accuracy })
                    );
                    location.value = `纬度：${latitude}，经度：${longitude}，精度：${accuracy}`;
                    Toast.success("定位已开启");
                  },
                  function () {
                    active.value = false;
                    Toast.fail("二次定位失败");
                  }
                );
              } else {
                active.value = false;
                Toast.fail("定位失败");
              }
            }
          );
        } else {
          Toast.fail("不支持H5定位");
        }
        active.value = true;
      }
    };

    onMounted(() => {
      const locations = localStorage.getItem("location");
      if (locations) {
        const { latitude, longitude, accuracy } = JSON.parse(locations);
        location.value = `纬度：${latitude}，经度：${longitude}，精度：${accuracy}`;
      }
    });

    return { active, location, getLocation };
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
