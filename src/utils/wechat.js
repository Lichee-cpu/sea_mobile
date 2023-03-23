/*
 * @Author: lxiang
 * @Date: 2023-03-21 21:36:56
 * @LastEditors: lxiang
 * @LastEditTime: 2023-03-23 15:19:46
 * @description: Modify here please
 * @FilePath: \sea_mobile\src\utils\wechat.js
 */
import wx from "weixin-js-sdk";
import { Toast } from "vant";
import { instance } from "@/axios/index";

/* 初始化微信SDK */
const currentUrl = window.location.href.split("#")[0];
instance.post("/api/user/wxticket", { currentUrl: currentUrl }).then((res) => {
  const { appId, timestamp, noncestr, signature } = res.data;
  wx.config({
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

export default wx;
