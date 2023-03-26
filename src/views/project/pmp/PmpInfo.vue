<template>
  <div class="info">
    <Header :title="title" transparent :nav="true" :defaultNav="true" />
    <van-skeleton v-if="loading" title :row="3" />
    <div v-else class="question">
      <ul>
        <li v-for="(i, o) in quersion" :key="o">
          <!-- 题目 -->
          <div class="name">{{ o + 1 }} : {{ i.name }}</div>
          <!-- 图片 -->
          <img v-if="i.name_pic1" :src="i.name_pic1" alt="" class="name-pic" />
          <img v-if="i.name_pic2" :src="i.name_pic2" alt="" class="name-pic" />
          <!-- 选项 -->
          <div class="item1" :class="i.correct_answer === 'A' ? 'correct' : ''">
            {{ i.item1 }}
          </div>
          <div class="item2" :class="i.correct_answer === 'B' ? 'correct' : ''">
            {{ i.item2 }}
          </div>
          <div class="item3" :class="i.correct_answer === 'C' ? 'correct' : ''">
            {{ i.item3 }}
          </div>
          <div class="item4" :class="i.correct_answer === 'D' ? 'correct' : ''">
            {{ i.item4 }}
          </div>
          <!-- 详解 -->
          <div @click="i.current_answer = !i.current_answer" class="detail">
            <van-icon name="info-o" />
          </div>
          <!-- 详解内容 -->
          <div :class="i.current_answer ? 'explains' : 'explain'">
            <div class="box" style="width: 100%; height: 200px">
              <div :class="i.correct_answer === 'A' ? 'explaint' : ''">
                {{ i.answer_content1 }}
              </div>
              <div :class="i.correct_answer === 'B' ? 'explaint' : ''">
                {{ i.answer_content2 }}
              </div>
              <div :class="i.correct_answer === 'C' ? 'explaint' : ''">
                {{ i.answer_content3 }}
              </div>
              <div :class="i.correct_answer === 'D' ? 'explaint' : ''">
                {{ i.answer_content4 }}
              </div>
              <img
                v-if="i.answer_pic1"
                :src="i.answer_pic1"
                alt=""
                class="name-pic"
              />
              <img
                v-if="i.answer_pic2"
                :src="i.answer_pic2"
                alt=""
                class="name-pic"
              />
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Header from "@/components/header/Header.vue";
import { getCurrentInstance, onMounted, ref } from "vue";
import { useRoute } from "vue-router";

export default {
  components: {
    Header,
  },
  setup() {
    const { proxy } = getCurrentInstance();
    const route = useRoute();
    const section = route?.query?.section;
    const title = route?.query?.title;
    const quersion = ref([]); //试题列表
    const loading = ref(true); //加载中
    // 获取试题列表
    const getlist = async () => {
      loading.value = true;
      const res = await proxy.$http.post("/api/pmp/get_test_info", {
        section: section,
      });
      quersion.value = res.data;
      loading.value = false;
    };

    onMounted(() => {
      getlist();
    });
    return { title, quersion, loading };
  },
};
</script>

<style lang="less" scoped>
.info {
  padding-top: var(--nav-bar-height);
  background: #e5e5e530;
}
.question {
  padding: 0 16px;
  li {
    margin: 16px;
    .name-pic {
      width: 100%;
    }
    .correct {
      color: #00b26a;
    }
    .explaint {
      color: #ffb149;
    }
    .detail {
      text-align: right;
      color: #ffb149;
    }
  }
}
.explain {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.25s;
}
.explains {
  max-height: 400px; /*足够存放内容的高度*/
}
</style>
