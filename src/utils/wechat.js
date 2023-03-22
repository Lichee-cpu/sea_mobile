/*
 * @Author: lxiang
 * @Date: 2023-03-21 21:36:56
 * @LastEditors: lxiang
 * @LastEditTime: 2023-03-22 15:48:45
 * @description: Modify here please
 * @FilePath: \sea_mobile\src\utils\wechat.js
 */
import wx from "weixin-js-sdk";

const WeChat = {
  init: function (config) {
    return new Promise((resolve, reject) => {
      wx.config({
        beta: true,
        debug: true,
        appId: config.appId,
        timestamp: config.timestamp,
        nonceStr: config.nonceStr,
        signature: config.signature,
        jsApiList: config.jsApiList,
      });
      wx.ready(() => {
        resolve();
      });
      wx.error((err) => {
        reject(err);
      });
    });
  },
  share: function (options) {
    wx.onMenuShareTimeline(options);
    wx.onMenuShareAppMessage(options);
    wx.onMenuShareQQ(options);
    wx.onMenuShareWeibo(options);
    wx.onMenuShareQZone(options);
  },
  getLocation() {
    return new Promise((resolve, reject) => {
      wx.getLocation({
        type: "gcj02", // 返回国测局坐标系经纬度，可用于wx.openLocation的坐标参数
        success: function (res) {
          const latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
          const longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
          resolve({ latitude, longitude });
        },
        fail: function (err) {
          reject(err);
        },
      });
    });
  },
};

export default WeChat;
