/*
 * @Author: lxiang
 * @Date: 2023-03-21 21:36:56
 * @LastEditors: lxiang
 * @LastEditTime: 2023-03-22 14:47:23
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
        // wx.authorize({
        //   scope: "scope.userLocation",
        //   success: function () {
        //     wx.getLocation({
        //       success: function (res) {
        //         Toast(
        //           "Latitude: " + res.latitude + ", Longitude: " + res.longitude
        //         );
        //       },
        //       fail: function (error) {
        //         wx.openSetting({
        //           success: function () {
        //             // 用户授权后重新获取位置信息
        //             wx.getLocation({
        //               success: function (res) {
        //                 console.log(
        //                   "Latitude: " +
        //                     res.latitude +
        //                     ", Longitude: " +
        //                     res.longitude
        //                 );
        //               },
        //               fail: function (error) {
        //                 console.error("重新授权 " + error.errMsg);
        //               },
        //             });
        //           },
        //           fail: function (error) {
        //             console.error(
        //               "Error opening settings page: " + error.errMsg
        //             );
        //           },
        //         });
        //         Toast("getLocation " + error.errMsg);
        //       },
        //     });
        //   },
        //   fail: function (error) {
        //     Toast("第二次失败获取用户是否授权" + error.errMsg);
        //   },
        // });

        // // 注册ready事件处理函数
        // wx.getLocation({
        //   success: function (res) {
        //     Toast(
        //       "Latitude: " + res.latitude + ", Longitude: " + res.longitude
        //     );
        //   },
        //   fail: function (error) {
        //     Toast("第一次获取 " + error.errMsg);
        //   },
        // });
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
