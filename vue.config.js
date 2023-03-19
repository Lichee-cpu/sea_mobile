module.exports = {
  devServer: {
    port: 8088,
    proxy: {
      "/": {
        // target: "http://localhost:8989",
        target: "https://car-service.lichee.top",
        secure: false,
        changeOrigin: true,
        logLevel: "debug",
        pathRewrite: {
          "^/": "/",
        },
      },
    },
  },
};
