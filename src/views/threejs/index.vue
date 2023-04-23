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
