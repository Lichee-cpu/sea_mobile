<!--
 * @Author: home 1400256031@qq.com
 * @Date: 2022-08-23 14:35:34
 * @LastEditors: home 1400256031@qq.com
 * @LastEditTime: 2022-08-23 20:48:55
 * @FilePath: \sea_mobile\src\views\project\picker\Picker.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <picker-2 :pickerData="state.pickerdata" @result="result" />
    {{ state.result }}
  </div>
</template>
<script>
import { reactive } from "@vue/reactivity";
import Picker2 from "./Picker2.vue";

export default {
  components: { Picker2 },
  setup() {
    const state = reactive({
      pickerdata: [
        "12-01",
        "12-02",
        "12-03",
        "12-04",
        "12-05",
        "12-06",
        "12-07",
        "12-08",
        "12-09",
        "12-10",
        "12-11",
        "12-12",
        "12-13",
        "12-14",
        "12-15",
        "12-16",
        "12-17",
        "12-18",
        "12-19",
        "12-20",
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
