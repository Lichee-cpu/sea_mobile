import WeChat from "@/utils/wechat.js";
import { instance } from "@/axios/index";
import { Toast } from "vant";

const wx = WeChat;
/* 初始化微信SDK */
const initWechat = () => {
  const currentUrl = window.location.href.split("#")[0];
  instance
    .post("/api/user/wxticket", { currentUrl: currentUrl })
    .then((res) => {
      const { appId, timestamp, noncestr, signature } = res.data;
      wx.init({
        appId: appId,
        timestamp: timestamp,
        nonceStr: noncestr,
        signature: signature,
        jsApiList: [
          "checkJsApi",
          "onMenuShareAppMessage",
          "onMenuShareWechat",
          "onMenuShareTimeline",
          "shareAppMessage",
          "shareWechatMessage",
          "startRecord",
          "stopRecord",
          "onVoiceRecordEnd",
          "playVoice",
          "pauseVoice",
          "stopVoice",
          "uploadVoice",
          "downloadVoice",
          "chooseImage",
          "previewImage",
          "uploadImage",
          "downloadImage",
          "getNetworkType",
          "openLocation",
          "getLocation",
          "hideOptionMenu",
          "showOptionMenu",
          "hideMenuItems",
          "showMenuItems",
          "hideAllNonBaseMenuItem",
          "showAllNonBaseMenuItem",
          "closeWindow",
          "scanQRCode",
          "previewFile",
          "openEnterpriseChat",
          "selectEnterpriseContact",
          "onHistoryBack",
          "openDefaultBrowser",
        ],
      })
        .then(() => {
          Toast.success("sdk初始化成功");
        })
        .catch(() => {
          Toast.fail("初始化失败");
        });
    });
};
initWechat();

export default wx;
