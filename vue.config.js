module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'https://qyapi.weixin.qq.com',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      },
      "/": {
        target: "http://localhost:8989",
        // target: "https://car-service.lichee.top",
        describe: "",
        secure: false,
        changeOrigin: true,
        logLevel: "debug",
      },
    },
  },
};
