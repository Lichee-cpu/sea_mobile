module.exports = {
  devServer: {
    host: "localhost",
    open: true,
    proxy: {
      "/": {
        // target: "http://localhost:8989",
        target: "https://car-service.lichee.top",
        changeOrigin: true,
      },
    },
  },
};
