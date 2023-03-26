<!--
 * @Author: lxiang
 * @Date: 2023-03-26 15:43:25
 * @LastEditors: lxiang
 * @LastEditTime: 2023-03-26 16:42:40
 * @description: 试题列表页
 * @FilePath: \sea_mobile\src\views\project\pmp\Pmp.vue
-->
<template>
  <div class="pmp">
    <Header title="PMP试题" transparent :nav="true" :defaultNav="true" />
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
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";

export default {
  components: {
    Header,
  },
  setup() {
    const section = ref(1); //
    const router = useRouter();
    const sectionList = reactive([
      { section: 1, name: "第一章：引论" },
      { section: 2, name: "第二章：项目运行环境" },
      { section: 3, name: "第三章：项目经理角色" },
      { section: 4, name: "第四章：项目整合管理" },
      { section: 7, name: "第五章：项目范围管理" },
      { section: 8, name: "第六章：项目进度管理" },
      { section: 9, name: "第七章：项目成本管理" },
      { section: 10, name: "第八章：项目质量管理" },
      { section: 11, name: "第九章：项目资源管理" },
      { section: 13, name: "第十章：项目风险管理" },
      { section: 12, name: "第十一章：项目沟通管理" },
      { section: 14, name: "第十二章：项目采购管理" },
      { section: 15, name: "第十三章：项目相关方管理" },
      { section: 5, name: "模拟一" },
      { section: 6, name: "模拟二" },
      { section: 16, name: "模拟三" },
      { section: 17, name: "模拟四" },
      { section: 18, name: "模拟五" },
      { section: 19, name: "模拟六" },
    ]);

    const setSection = (i) => {
      section.value = i.section;
      router.push({
        name: "PmpInfo",
        query: { section: i.section, title: i.name },
      });
    };
    return { section, sectionList, setSection };
  },
};
</script>

<style lang="less" scoped>
.pmp {
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
  color: #34495e;
  font-weight: 600;
  font-size: 14px;
  line-height: 40px;
  background-color: #f9f9f9;
  border-radius: 99px;
  transition: opacity 0.3s;
  align-items: center;
  justify-content: space-between;
}
</style>
