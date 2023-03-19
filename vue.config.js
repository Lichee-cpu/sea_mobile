/*
 * @Author: lxiang
 * @Date: 2023-03-16 14:22:51
 * @LastEditors: lxiang
 * @LastEditTime: 2023-03-19 15:32:36
 * @description: Modify here please
 * @FilePath: \sea_mobile\vue.config.js
 */
module.exports = {
  devServer: {
    port: 8088,
    proxy: {
      "/api": {
        // target: "http://localhost:8989",
        target: "https://car-service.lichee.top",
        secure: false,
        changeOrigin: true,
        logLevel: "debug",
        pathRewrite: {
          "^/api": "/",
        },
      },
    },
  },
};
