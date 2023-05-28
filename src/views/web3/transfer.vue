<!--
 * @Author: lxiang
 * @Date: 2023-05-26 08:41:13
 * @LastEditors: lxiang
 * @LastEditTime: 2023-05-26 12:01:44
 * @description: 转账
 * @FilePath: \sea_mobile\src\views\web3\transfer.vue
-->
<template>
  <div class="web3">
    <div class="head">
      <div class="title">交易</div>
    </div>

    <div class="action">
      <div class="send">发送</div>
      <div class="receive">接收</div>
    </div>

    <div @click="getWalletAddress">
      <van-icon
        name="link-o"
        :color="connected ? 'var(--green)' : '#e0e0e0'"
        style="font-weight: bold"
      />
      <span>{{ connected ? "已连接" : "未连接" }}</span>
    </div>

    <form @submit.prevent="transfer">
      <div>
        <label>转账地址：</label>
        <input v-model="to" type="text" />
      </div>
      <div>
        <label>转账金额：</label>
        <input v-model="amount" type="text" />
      </div>
      <button type="submit">转账</button>
    </form>
    <div v-if="transferResult">{{ transferResult }}</div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import web3 from "./web3";
export default {
  setup() {
    const connected = ref(false); // 是否连接钱包
    const walletAddress = ref(null); // 当前钱包地址
    const to = ref(null); // 转账地址
    const amount = ref(null); // 转账金额
    const transferResult = ref(null); // 转账结果

    // 获取钱包地址
    const getWalletAddress = async () => {
      const accounts = await web3.eth.getAccounts(); // 获取钱包地址
      walletAddress.value = accounts[0]; // 设置钱包地址
      if (walletAddress.value) {
        connected.value = true; // 设置连接状态
      }
    };

    // 转账
    const transfer = async () => {
      try {
        const value = web3.utils.toWei(amount.value, "ether"); // 转账金额
        await web3.eth.sendTransaction({
          from: walletAddress.value,
          to: to.value,
          value: value,
        });
        transferResult.value = "转账成功！";
      } catch (error) {
        console.error(error);
        transferResult.value = "转账失败！";
      }
    };
    // 检查是否连接钱包
    const checkConnection = async () => {
      try {
        const connect = await web3.eth.net.isListening();
        if (connect) {
          connected.value = true;
        } else {
          connected.value = false;
        }
      } catch (error) {
        console.error(error);
      }
    };

    onMounted(() => {
      checkConnection();
    });

    return {
      walletAddress,
      to,
      amount,
      transferResult,
      connected,
      transfer,
      getWalletAddress,
    };
  },
};
</script>
<style lang="less" scoped>
.web3 {
  height: 100%;
  background-color: var(--group-bg);
}
.head {
  height: var(--nav-bar-height);
  display: flex;
  align-items: center;
  justify-content: center;
  .title {
    font-size: 18px;
    font-weight: bold;
  }
}
</style>
