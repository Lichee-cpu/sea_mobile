<template>
  <div>
    <div class="bullet-wrap">
      <div
        class="bullet-item bullet-animation"
        :class="{ 'bullet-item--c': item.isLoginUser }"
        :data-line="item.line"
        v-for="item in state.bulletlist"
        @animationend="animationend"
        :key="item.id"
      >
        {{ item.name }}
      </div>
    </div>
    <!-- 原始 -->
    <!-- <div class="flex">
      <input
        style="flex: 1 1 auto"
        type="text"
        ref="input"
        v-model="state.values"
      />
      <button style="flex: 0 1 3em; text-align: center" @click="sendBullet">
        发送
      </button>
    </div> -->
    <!-- vant输入框 -->
    <van-cell-group inset>
      <van-field
        v-model="state.values"
        center
        right-icon="guide-o"
        @click-right-icon="sendBullet"
        placeholder="发送一条友好的弹幕吧"
      >
      </van-field>
    </van-cell-group>
  </div>
</template>
<script>
import { reactive, onMounted } from "vue";

export default {
  setup() {
    function getUUID() {
      return Date.now() + Math.random();
    }
    const state = reactive({
      list: [
        { id: getUUID(), name: "11111", isLoginUser: true, line: 0 },
        { id: getUUID(), name: "2222222", isLoginUser: true, line: 0 },
        { id: getUUID(), name: "3333", isLoginUser: true, line: 0 },
      ], // 普通的弹幕队列
      clist: [], // c位的弹幕队列
      bulletlist: [], // 当前正在执行的
      values: "",
      idx: 3,
    });

    function animationend() {
      state.list.push(state.bulletlist.shift());
    }

    function sendBullet() {
      if (state.values) {
        state.clist.push({
          id: getUUID(),
          name: state.values,
          isLoginUser: true,
          line: 0,
        });
        state.values = "";
      }
    }
    onMounted(() => {
      setInterval(() => {
        var item = null;
        if (state.idx == 3) {
          // c 位
          item = state.clist.shift();
        }
        if (!item) {
          item = state.list.shift();
        }
        if (item) {
          item.line = state.idx;
          state.idx = (state.idx % 5) + 1;
          state.bulletlist.push(item);
        } else {
          if (state.clist.length) {
            item = state.clist.shift();
            item.line = 3;
            state.idx = 3;
            state.bulletlist.push(item);
          }
        }
      }, 1000);
    });

    return {
      state,
      sendBullet,
      animationend,
    };
  },
};
</script>
<style scoped>
.flex {
  display: flex;
}

.van-cell-group--inset {
  margin: auto;
  border-radius: 50px;
  border: 1px solid #d8d7d7;
}
.van-cell {
  background: #f8f8f8;
}

.bullet-wrap {
  height: 400px;
  position: relative;
  overflow: hidden;
  font-size: 36px;
  background: url(https://www.lilnong.top/static/img/Desert.jpg) center center
    no-repeat;
  background-size: cover;
  margin-bottom: 40px;
}
.bullet-item {
  text-shadow: 1px 1px #000;
  color: #ffffff82;
  white-space: nowrap;
  user-select: none;
  position: absolute;
  top: 0;
  left: 0;
}
.bullet-item--c {
  border: 1px solid #ff000082;
}
.bullet-item[data-line="1"] {
  top: 0px;
}
.bullet-item[data-line="2"] {
  top: 80px;
}
.bullet-item[data-line="3"] {
  top: 160px;
}
.bullet-item[data-line="4"] {
  top: 240px;
}
.bullet-item[data-line="5"] {
  top: 320px;
}
.bullet-animation {
  animation: right2left 7s linear both;
}

@keyframes right2left {
  0% {
    transform: translate(100vw);
  }
  100% {
    transform: translate(-100%);
  }
}
</style>
