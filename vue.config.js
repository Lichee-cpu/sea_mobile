/*
 * @Author: lxiang
 * @Date: 2023-03-16 14:22:51
 * @LastEditors: lxiang
 * @LastEditTime: 2023-04-07 16:09:16
 * @description: Modify here please
 * @FilePath: \sea_mobile\vue.config.js
 */
module.exports = {
  devServer: {
    port: 8088,
    proxy: {
      "/api/test": {
        target: "https://wechat.pmxyj.cn",
        secure: false,
        changeOrigin: true,
        logLevel: "debug",
        pathRewrite: {
          "^/api/test/": "/api/test/",
        },
      },
      "/api": {
        target: "http://localhost:8989",
        // target: "http://1.15.15.164:8989/",
        secure: false,
        changeOrigin: true,
        logLevel: "debug",
        pathRewrite: {
          "^/api": "",
        },
      },
      "/ws": {
        target: "https://apis.map.qq.com",
        secure: false,
        changeOrigin: true,
        logLevel: "debug",
      },
    },
  },
};
