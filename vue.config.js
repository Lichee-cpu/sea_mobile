module.exports = {
  devServer: {
    proxy: {
      "/api": {
        // target: "http://localhost:8989",
        target: "https://car-service.lichee.top",
        pathRewrite: {
          "^/api": "/",
        },
      },
    },
  },
};
