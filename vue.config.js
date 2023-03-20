/*
 * @Author: lxiang
 * @Date: 2023-03-16 14:22:51
 * @LastEditors: lxiang
 * @LastEditTime: 2023-03-20 20:02:32
 * @description: Modify here please
 * @FilePath: \sea_mobile\vue.config.js
 */
module.exports = {
  devServer: {
    port: 8088,
    proxy: {
      "/api": {
        // target: "http://localhost:8989",
        target: "http://1.15.15.164:8989/",
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
