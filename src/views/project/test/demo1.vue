<!--
 * @Author: lxiang
 * @Date: 2023-08-10 09:38:21
 * @LastEditors: lxiang
 * @LastEditTime: 2023-08-10 15:43:42
 * @description: Modify here please
 * @FilePath: \sea_mobile\src\views\project\test\demo1.vue
-->
<template>
  <div class="box">
    <div class="bg-box">
      <img src="@/assets/project/jiantou.png" alt="" />
      <div class="tg tag1">
        <div class="title">特资</div>
        <div class="point"></div>
        <div class="content">
          <div class="time">2023/09/09</div>
          <div class="step">进入特资</div>
        </div>
      </div>
      <div class="tg tag2">
        <div class="title">特资</div>
        <div class="point"></div>
        <div class="content">
          <div class="time">2023/09/09</div>
          <div class="step">进入特资</div>
        </div>
      </div>
      <div class="tg tag3">
        <div class="title">特资</div>
        <div class="point"></div>
        <div class="content">
          <div class="time">2023/09/09</div>
          <div class="step">进入特资</div>
        </div>
      </div>
      <div class="tg tag4">
        <div class="title">特资</div>
        <div class="point"></div>
        <div class="content">
          <div class="time">2023/09/09</div>
          <div class="step">进入特资</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.box {
  padding: 32px;
}
.bg-box {
  border: 1px solid #ccc;
  position: relative;
  //   background-image: linear-gradient(
  //       to right,
  //       rgba(0, 0, 0, 0.2) 1px,
  //       transparent 1px
  //     ),
  //     linear-gradient(to bottom, rgba(0, 0, 0, 0.2) 1px, transparent 1px);
  //   background-size: 20px 20px; /* 根据需要设置网格大小 */
  img {
    width: 100%;
    height: auto;
    border: 1px solid #ee4242;
    // opacity: 0.5;
  }
}

.tg {
  max-width: 120px;
  text-align: center;
  .title {
    text-align: center;
    width: 100%;
    max-width: 120px;
    background: blue;
    border-radius: 50px;
    line-height: 16px;
    padding: 13px 44px;
    color: #fff;
  }
  .point {
    width: 24px;
    height: 24px;
    background: blue;
    border-radius: 50%;
    margin: 0 auto;
    margin: 12px auto;
    border: 4px solid #fff;
  }
}
.tag1 {
  position: absolute;
  left: calc(~"0% + 60px");
  top: calc(~"48% - 65px");
  right: 0;
}
.tag2 {
  position: absolute;
  left: calc(~"25% + 60px");
  top: calc(~"88% - 65px");
  right: 0;
}
.tag3 {
  position: absolute;
  left: calc(~"50% + 60px");
  top: calc(~"90% - 65px");
  right: 0;
}
.tag4 {
  position: absolute;
  left: calc(~"75% + 60px");
  top: calc(~"47% - 65px");
  right: 0;
}
</style>
