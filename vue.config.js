module.exports = {
  devServer: {
    proxy: {
      "/": {
        target: "https://car-service.lichee.top",
        changeOrigin: true,
        pathRewrite: {
          "^/": "/",
        },
      },
    },
  },
};
