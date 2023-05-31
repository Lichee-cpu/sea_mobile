<template>
  <div class="home">
    <!-- 卡片 -->
    <div class="card">
      <div class="card-content">
        <div @click="getWalletAddress" class="row1">
          <van-icon
            name="link-o"
            :color="connected ? 'var(--green)' : '#e0e0e0'"
            style="font-weight: bold"
          />
          <span class="status">{{ connected ? "已连接" : "未连接" }}</span>
        </div>
        <div class="row2">
          <span>{{ unit }}</span>
          <span class="balance">{{ balance?.substring(0, 13) }}</span>
        </div>
        <div class="row3" @click="copyAddress">
          {{
            walletAddress
              ? walletAddress.substring(0, 4) +
                "..." +
                walletAddress.substring(walletAddress.length - 6)
              : "未连接钱包"
          }}
        </div>
      </div>
      <div class="icon">
        <img src="@/assets/web3/card-bg.png" alt="" srcset="" />
      </div>
    </div>

    <!-- 交易 -->
    <div class="action">
      <div
        :class="[active == 'send' ? 'active' : '', 'send']"
        @click="change('send')"
      >
        转账
      </div>
      <div
        :class="[active == 'receive' ? 'active' : '', 'receive']"
        @click="change('receive')"
      >
        接收
      </div>
    </div>
    <!-- 转账 -->
    <div class="send-box" v-show="active == 'send'">
      <div class="form">
        <div :class="[step !== 1 ? 'show' : '', 'address']" v-if="step !== 1">
          {{ to.substring(0, 4) + "..." + to.substring(to.length - 6) }}
        </div>
        <div class="input-box">
          <div :class="[step == 1 ? 'step1-box' : 'shrink']">
            <input
              type="text"
              placeholder="请输入接收地址"
              v-model="to"
              :class="[step == 1 ? 'step1' : 'shrink']"
            />
            <van-icon
              @click="scanAddress"
              v-if="step == 1"
              name="scan"
              :class="[step == 1 ? 'step1-icon' : 'shrink']"
            />
          </div>

          <input
            v-if="step == 2"
            type="text"
            placeholder="请输入转账金额"
            v-model="amount"
            class="animated-block block-1"
          />
          <input
            v-if="step == 2"
            type="text"
            placeholder="请输入备注"
            v-model="remark"
            class="animated-block block-2"
          />
        </div>
        <div class="next" @click="stepAdd">下一步</div>
      </div>
    </div>
    <!-- 接收 -->
    <div class="receive-box" v-show="active == 'receive'">
      <div class="qrcode">
        <img :src="qrCodeDataUrl" alt="" />
      </div>
      <div class="code" @click="copyAddress">
        {{
          walletAddress
            ? walletAddress.substring(0, 4) +
              "..." +
              walletAddress.substring(walletAddress.length - 6)
            : "未连接钱包"
        }}<van-icon name="link-o" />
      </div>
    </div>

    <!-- 弹窗 -->
    <van-popup v-model:show="showTop" position="top" :style="{ height: '30%' }">
      <qr-stream @decode="result" v-if="showTop" />
    </van-popup>
  </div>
</template>

<script>
import { onMounted, reactive, ref, toRefs } from "vue";
import web3 from "./web3";
import { Toast } from "vant";
import QRCode from "qrcode";
import QrStream from "@/components/qr-code/QrStream.vue";

export default {
  components: {
    QrStream,
  },
  setup() {
    const walletAddress = ref(null); // 当前钱包地址
    const connected = ref(false); // 是否连接钱包
    const state = reactive({
      balance: "0", // 余额
      unit: "ETH", // 余额单位
      to: "", // 接收地址
      amount: "", // 转账金额
      remark: "", // 备注
    });
    const active = ref("send"); // 交易类型
    const qrCodeDataUrl = ref(null); // 二维码
    const step = ref(1); // 步骤

    // 获取钱包地址
    const getWalletAddress = async () => {
      const accounts = await web3.eth.getAccounts(); // 获取钱包地址
      walletAddress.value = accounts[0]; // 设置钱包地址
      console.log("当前钱包地址", walletAddress.value);
      if (walletAddress.value) {
        getBalance(); // 查询余额
        connected.value = true; // 设置连接状态
      }
    };

    // 检查是否连接钱包
    const checkConnection = async () => {
      try {
        const connect = await web3.eth.net.isListening();
        if (connect) {
          connected.value = true;
          getWalletAddress();
        } else {
          connected.value = false;
        }
      } catch (error) {
        console.error(error);
      }
    };

    // 查询余额
    const getBalance = async () => {
      try {
        // 获取ETH余额
        const balances = await web3.eth.getBalance(walletAddress.value);
        const balanceInEther = web3.utils.fromWei(balances, "ether");
        state.balance = balanceInEther;
        // 获取USDT余额
        // const usdtContractAddress =
        //   "0xdac17f958d2ee523a2206206994597c13d831ec7"; // USDT合约地址
        // const usdtContract = new web3.eth.Contract(abi, usdtContractAddress);
        // const balanceInWei = await usdtContract.methods
        //   .balanceOf(walletAddress.value)
        //   .call();
        // const balanceInUSDT = web3.utils.fromWei(balanceInWei, "ether");
        // balance.value = balanceInUSDT;
      } catch (error) {
        console.error("出错", error);
      }
    };

    // 复制钱包地址
    const copyAddress = () => {
      if (walletAddress.value) {
        navigator.clipboard.writeText(walletAddress.value);
        Toast("复制成功");
      } else {
        checkConnection(); // 检查是否连接钱包
      }
    };
    // 切换交易类型
    const change = (type) => {
      active.value = type;
      if (type === "receive") {
        generateQRCode();
      }
    };

    // 生成二维码
    const generateQRCode = async () => {
      try {
        const dataUrl = await QRCode.toDataURL(walletAddress.value);
        qrCodeDataUrl.value = dataUrl;
      } catch (error) {
        console.error(error);
      }
    };

    // 下一步
    const stepAdd = () => {
      if (step.value < 2) {
        step.value++;
      } else if (step.value == 2) {
        transfer();
      }
    };

    // 关闭
    const close = () => {
      step.value = 1;
      state.to = "";
      state.amount = "";
    };
    // 发送交易
    const transfer = async () => {
      try {
        const data = web3.utils.asciiToHex(state.remark);
        const value = web3.utils.toWei(state.amount.toString(), "ether"); // 转账金额
        await web3.eth.sendTransaction({
          from: walletAddress.value,
          to: state.to,
          value: value,
          data: data,
        });
        Toast.success("转账成功!");
        getBalance(); // 更新余额
        close(); // 重置步骤
      } catch (error) {
        console.error(error);
        Toast.fail("转账失败!");
      }
    };

    // 扫描模块
    const showTop = ref(false); // 是否显示弹窗

    // 打开弹窗进行扫描
    const scanAddress = () => {
      showTop.value = true;
    };
    const result = (res) => {
      state.to = res;
      showTop.value = false;
      console.log("扫描结果", res);
    };

    onMounted(() => {
      checkConnection(); // 检查是否连接钱包
      // 监听Metamask中帐户切换事件
      window.ethereum.on("accountsChanged", (accounts) => {
        walletAddress.value = accounts[0];
        getBalance();
      });
    });

    return {
      ...toRefs(state),
      connected,
      active,
      walletAddress,
      qrCodeDataUrl,
      step,
      showTop,
      close,
      transfer,
      getWalletAddress,
      copyAddress,
      change,
      stepAdd,
      scanAddress,
      result,
    };
  },
};
</script>

<style lang="less" scoped>
.home {
  height: 100%;
  padding-top: var(--van-nav-bar-height);
  padding-bottom: var(--van-tabbar-height);
  background-color: var(--group-bg);
  overflow: auto;
}
/* 卡片 */
.card {
  max-width: 100%;
  height: 0;
  margin: 0 5%;
  padding-bottom: 52%;
  border-radius: 8px;
  background-color: #2a2a2a;
  box-shadow: 2px 4px 4px #9b9999;
  position: relative;
}

.card-content {
  position: absolute;
  top: 20px;
  left: 20px;
  right: 20px;
  bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 1;
}
.card .row1 {
  display: flex;
  align-items: center;
  .status {
    margin-left: 4px;
    font-size: small;
    color: var(--tag3);
  }
}
.card .row2 {
  flex: 1;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: center;
  color: #ffffff;
  .balance {
    font-size: 36px;
    font-weight: bold;
    color: var(--yellow);
  }
}

.card .row3 {
  font-size: small;
  color: var(--tag3);
}
.card .icon {
  position: absolute;
  bottom: -2px;
  right: -10px;
  width: 50%;
  z-index: 0;
  opacity: 0.3;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
  }
}

/* 交易 */
.action {
  display: flex;
  justify-content: space-between;
  margin: 0 5%;
  margin-top: 42px;
  .send {
    width: 48%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border-radius: 8px;
    background-color: var(--tag3);
    color: #ffffff;
  }
  .receive {
    width: 48%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border-radius: 8px;
    background-color: var(--tag3);
    color: #ffffff;
  }
}

.send-box {
  .form {
    width: 90%;
    margin: 60px auto;
    border: 1px solid;
    padding: 16px;
    border-radius: 8px;
    transition: all 2s ease;

    .address {
      color: var(--tag2);
      font-size: 14px;
      line-height: 20px;
    }
    .input-box {
      display: flex;
      flex-direction: column;
      input {
        padding: 4px;
        border: 0.5px solid #e0e0e0;
        line-height: 24px;
        margin-bottom: 14px;
        border-radius: 4px;
        transition: all 0.3s ease;
      }
      .step1-box {
        display: flex;
        align-items: center;
      }
      .step1 {
        width: 90%;
      }
      .step1-icon {
        font-size: larger;
        font-weight: bold;
        margin-left: 8px;
        margin-bottom: 14px;
      }
      .shrink {
        width: 0;
        height: 0;
        padding: 0;
        margin: 0;
        animation: show 0.3s linear reverse;
      }

      .animated-block {
        opacity: 0;
        animation: fade-in 1s forwards;
      }

      @keyframes fade-in {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }

      .block-1 {
        animation-delay: 0s;
      }

      .block-2 {
        animation-delay: 1s;
      }
    }

    .next {
      width: 50%;
      margin: 0 auto;
      border: 1px solid var(--yellow);
      background: var(--yellow);
      border-radius: 4px;
      color: #fff;
      text-align: center;
      padding: 8px;
    }
    .show {
      margin-bottom: 14px;
      animation: show 0.3s linear;
    }

    @keyframes show {
      0% {
        opacity: 0.5;
      }
      100% {
        opacity: 0.8;
      }
    }
  }
}

.receive-box {
  text-align: center;
  margin-top: 10%;
  img {
    box-shadow: 0px 0px 8px 6px #e2e2e2;
    padding: 16px;
  }
  .code {
    margin-top: 12px;
  }
}

.active {
  transition: all ease-in-out 0.35s;
  background-color: var(--yellow) !important;
  color: #000000 !important;
}
</style>
