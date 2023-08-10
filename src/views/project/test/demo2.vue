<!--
 * @Author: lxiang
 * @Date: 2023-08-10 11:29:15
 * @LastEditors: lxiang
 * @LastEditTime: 2023-08-10 15:31:18
 * @description: 利用js定位
 * @FilePath: \sea_mobile\src\views\project\test\demo2.vue
-->
<template>
  <div class="box">
    <div class="bg-box" ref="bgBox">
      <img src="@/assets/project/jiantou.png" alt="" @load="setDraw" />
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
export default {
  setup() {
    const res = ref([
      { title: "标题1", time: "2023/09/09", step: "进入特1" },
      { title: "标题2", time: "2023/09/09", step: "进入特2" },
      { title: "标题3", time: "2023/09/09", step: "进入特3" },
      { title: "标题4", time: "2023/09/09", step: "进入特4" },
    ]);
    const bgBox = ref(null);

    const setDraw = () => {
      // 先清除bgBox下所有的div，保留img
      const divs = bgBox.value.querySelectorAll("div");
      divs.forEach((item) => {
        if (item.className === "tg") {
          bgBox.value.removeChild(item);
        }
      });

      // 获取元素宽高
      const width = bgBox.value.offsetWidth;
      const height = bgBox.value.offsetHeight;
      const TOP = [0.48, 0.88, 0.9, 0.47];
      const LEFT = [0.01, 0.25, 0.5, 0.75];
      const COLOR = ["#2196f3", "#ff5722", "#4caf50"]; //蓝黄绿

      res.value.forEach((item, index) => {
        const tg = document.createElement("div");
        tg.className = "tg";
        // tg.style.width = "120px";
        tg.style.textAlign = "center";
        tg.style.position = "absolute";
        tg.style.top = height * TOP[index] - 65 + "px";
        if (width <= 1177) {
          tg.style.left = width * LEFT[index] + "px";
        } else if (width <= 1277) {
          tg.style.left = width * LEFT[index] + 30 * LEFT[index] + "px";
        } else {
          tg.style.left = width * LEFT[index] + 60 * LEFT[index] + "px";
        }
        // 颜色奇数取第一个偶数取第二个，最后一个取第三个
        const colorIndex =
          index === res.value.length - 1 ? 2 : index % 2 === 0 ? 0 : 1;

        tg.innerHTML = `
        <div style="background: ${COLOR[colorIndex]};border-radius: 50px;line-height: 16px;padding: 13px 44px;color: #fff;">${item.title}</div>
        <div class="point" style="width: 24px;height: 24px;background: ${COLOR[colorIndex]};border-radius: 50%;margin: 12px auto;border:4px solid #fff;"></div>
        <div class="content">
          <div class="time">${item.time}</div>
          <div class="step">${item.step}</div>
        </div>
        `;

        bgBox.value.appendChild(tg);
      });
    };
    onMounted(() => {
      //监听窗口大小变化
      window.addEventListener("resize", setDraw);
    });

    return { bgBox, res, setDraw };
  },
};
</script>
<style lang="less" scoped>
.box {
  padding: 32px;
}

.bg-box {
  width: 100%;
  position: relative;
  border: 1px solid #ccc;
  img {
    width: 100%;
    height: auto;
    border: 1px solid #ee4242;
  }
}
</style>
