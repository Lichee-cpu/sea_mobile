<!--
 * @Author: home 1400256031@qq.com
 * @Date: 2022-08-23 14:35:34
 * @LastEditors: home 1400256031@qq.com
 * @LastEditTime: 2022-08-23 20:48:55
 * @FilePath: \sea_mobile\src\views\project\picker\Picker.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="wrap">
    <Header title="picker" />
    <div class="picker">
      <div class="title">横向滚动</div>
      <picker-2 :pickerData="state.pickerdata" @result="result" />
      <div class="title">3D滚动</div>
      <picker-3 :pickerData="state.pickerdata" @result="result" />
      <div class="title">返回数据</div>
      <div>{{ state.result }}</div>
    </div>
  </div>
</template>
<script>
import { reactive } from "@vue/reactivity";
import Picker2 from "./Picker2.vue";
import Picker3 from "./Picker3.vue";
import Header from "../../../components/header/Header.vue";
export default {
  components: { Header, Picker2, Picker3 },
  setup() {
    const state = reactive({
      pickerdata: [
        "2022-12-01",
        "2022-12-02",
        "2022-12-03",
        "2022-12-04",
        "2022-12-05",
        "2022-12-06",
        "2022-12-07",
      ],
      result: 0,
    });
    const result = (e) => {
      state.result = e;
    };

    return { state, result };
  },
};
</script>
<style lang="less" scoped>
.wrap {
  height: 100%;
  position: relative;
  padding-top: var(--nav-bar-height);
  .picker {
    margin-top: 30px;
  }
  .title {
    margin: 10px;
    font-weight: 700;
  }
}
</style>
