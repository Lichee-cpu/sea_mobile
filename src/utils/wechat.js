/*
 * @Author: lxiang
 * @Date: 2023-03-21 21:36:56
 * @LastEditors: lxiang
 * @LastEditTime: 2023-03-23 17:09:32
 * @description: Modify here please
 * @FilePath: \sea_mobile\src\utils\wechat.js
 */
import wx from "weixin-js-sdk";
import { Toast } from "vant";
import { instance } from "@/axios/index";

const wechat = wx;
/* 初始化微信SDK */
const currentUrl = window.location.href.split("#")[0];
const initWechat = () => {
  instance
    .post("/api/user/wxticket", { currentUrl: currentUrl })
    .then((res) => {
      var { appId, timestamp, noncestr, signature } = res.data;
      wechat.config({
        beta: true, // 必须这么写，否则wx.invoke调用形式的jsapi会有问题
        debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
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
      });
      wechat.ready(() => {
        Toast("微信SDK初始化成功");
      });
      wechat.error((err) => {
        Toast("初始化失败" + err);
      });
    });
};
initWechat();

export default wechat;
