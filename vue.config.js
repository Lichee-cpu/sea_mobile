/*
 * @Author: lxiang
 * @Date: 2022-08-05 17:14:24
 * @LastEditors: lxiang
 * @LastEditTime: 2023-03-16 08:36:20
 * @description: Modify here please
 * @FilePath: \sea_mobile\vue.config.js
 */
module.exports = {
  devServer: {
    proxy: {
      "/cgi-bin": {
        target: "https://qyapi.weixin.qq.com",
        describe: "", // 代理描述
        secure: true, // 如果是https接口，需要配置这个参数
        changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
        logLevel: "debug", // 日志级别
      },
      "/": {
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
