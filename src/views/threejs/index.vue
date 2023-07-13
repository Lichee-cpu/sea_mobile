<!--
 * @Author: lxiang
 * @Date: 2023-04-21 09:14:27
 * @LastEditors: lxiang
 * @LastEditTime: 2023-07-13 15:35:36
 * @description: Modify here please
 * @FilePath: \sea_mobile\src\views\threejs\index.vue
-->
<template>
  <div class="three">
    <Header title="ThreeJs" transparent :nav="true" :defaultNav="true" />
    <div>
      <ul>
        <li v-for="(i, o) in sectionList" :key="o" @click="setSection(i)">
          <span>{{ i.name }}</span>
          <van-icon name="arrow" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Header from "@/components/header/Header.vue";
import { reactive } from "vue";
import { useRouter } from "vue-router";
export default {
  components: {
    Header,
  },
  setup() {
    const router = useRouter();
    const sectionList = reactive([
      { section: 1, name: "第一节--正方体" },
      { section: 2, name: "第二节--轨道控制器" },
      { section: 3, name: "第三节--坐标辅助器" },
      { section: 4, name: "第四节--缩放与旋转" },
      { section: 5, name: "第五节--requestAnimationFrame" },
      { section: 6, name: "第六节--跟踪时间对象-Clock" },
      { section: 7, name: "第七节--动画库" },
      { section: 8, name: "第八节--用户界面更改变量" },
      { section: 9, name: "第九节--法向属性" },
      { section: 10, name: "第十节--三角形" },
      { section: 11, name: "第十一节--材质" },
      { section: 12, name: "第十二节--纹理适应" },
      { section: 13, name: "第十三节--环境遮挡与贴图强度" },
      { section: 14, name: "第十四节--PBR物理的渲染" },
      { section: 15, name: "第十五节--贴图" },
      { section: 16, name: "第十六节--加载进度" },
      { section: 17, name: "第十七节--环境纹理" },
      { section: 18, name: "第十八节--HDR加载" },
      { section: 19, name: "第十九节--灯光" },
      { section: 20, name: "第二十节--聚光灯" },
      { section: 21, name: "第二十一节--点光源" },
      { section: 22, name: "第二十二节--VR看房" },
      { section: 23, name: "第二十三节--VR看房点击" },
      { section: 24, name: "第二十四节--包围盒" },
      { section: 25, name: "第二十五节--边缘几何矩阵与线框几何体" },
      { section: 26, name: "第二十六节--雪花" },
      { section: 27, name: "第二十七节--形状的星系" },
      { section: 28, name: "第二十八节--选中目标" },
      { section: 29, name: "第二十九节--物理碰撞" },
      { section: 30, name: "第三十节--" },
    ]);
    const setSection = (i) => {
      router.push({
        name: "ThreeDemo" + i.section,
        query: { section: i.section, title: i.name },
      });
    };
    return {
      sectionList,
      setSection,
    };
  },
};
</script>

<style lang="less" scoped>
.three {
  padding-top: var(--nav-bar-height);
  background: var(--bg-primary);
}
ul {
  padding: 32px;
}
li {
  position: relative;
  display: flex;
  margin: 0 0 12px;
  padding: 0 20px;
  font-weight: 600;
  font-size: 14px;
  line-height: 40px;
  background-color: var(--grey3);
  border-radius: 99px;
  transition: opacity 0.3s;
  align-items: center;
  justify-content: space-between;
}
</style>
