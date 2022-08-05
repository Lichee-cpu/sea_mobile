module.exports = {
  devServer: {
    proxy: {
      ["/"]: {
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
