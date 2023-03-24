/*
 * @Author: lxiang
 * @Date: 2023-03-21 21:36:56
 * @LastEditors: lxiang
 * @LastEditTime: 2023-03-24 09:38:00
 * @description: Modify here please
 * @FilePath: \sea_mobile\src\utils\wechat.js
 */
import wx from "weixin-js-sdk";
import { instance } from "@/axios/index";

const WeChat = {
  init: function (jsApiList = [], url) {
    return new Promise((resolve, reject) => {
      instance
        .post("/api/user/wxticket", { currentUrl: url })
        .then((res) => {
          const { appId, timestamp, noncestr, signature } = res.data;
          if (appId) {
            wx.config({
              beta: true,
              debug: false,
              appId: appId,
              timestamp: timestamp,
              nonceStr: noncestr,
              signature: signature,
              jsApiList: jsApiList,
            });
            wx.ready((res) => {
              resolve(wx, res);
            });
            wx.error((err) => {
              reject(err);
            });
          } else {
            reject(res);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};

export default WeChat;
