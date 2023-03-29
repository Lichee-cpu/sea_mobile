/*
 * @Author: lxiang
 * @Date: 2023-03-21 21:36:56
 * @LastEditors: lxiang
 * @LastEditTime: 2023-03-29 17:52:31
 * @description: Modify here please
 * @FilePath: \sea_mobile\src\utils\wechat2.js
 */
import { instance } from "@/axios/index";
import { Toast } from "vant";
const wx = window.wx;
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
            wx.ready(() => {
              wx.hideOptionMenu(); //隐藏右上角菜单接口
              instance
                .post("/api/user/agentconfig", { currentUrl: url })
                .then((res) => {
                  const { appId, timestamp, noncestr, signature } = res.data;
                  wx.agentConfig({
                    corpid: appId, // 必填，企业微信的corpid，必须与当前登录的企业一致
                    agentid: "1000002", // 必填，企业微信的应用id （e.g. 1000247）
                    timestamp: timestamp, // 必填，生成签名的时间戳
                    nonceStr: noncestr, // 必填，生成签名的随机串
                    signature: signature, // 必填，签名，见附录-JS-SDK使用权限签名算法
                    jsApiList: jsApiList, //你要调用的sdk接口必填
                    success: function () {
                      resolve(wx);
                    },
                    fail: function (res) {
                      Toast("版本过低请升级" + res);
                    },
                  });
                });
            });

            wx.error((err) => {
              Toast("微信初始化失败");
              reject(err);
            });
          } else {
            Toast("微信初始化失败");
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
