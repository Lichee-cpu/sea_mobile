/*
 * @Author: lxiang
 * @Date: 2022-08-05 17:14:24
 * @LastEditors: lxiang
 * @LastEditTime: 2023-03-19 11:01:30
 * @description: Modify here please
 * @FilePath: \sea_mobile\vue.config.js
 */
module.exports = {
  devServer: {
    proxy: {
      "/a": {
        // target: "http://localhost:8989",
        target: "https://car-service.lichee.top",
        describe: "",
        secure: false,
        changeOrigin: true,
        logLevel: "debug",
      },
    },
  },
};
