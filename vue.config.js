module.exports = {
  devServer: {
    proxy: {
      ["/"]: {
        target: "http://localhost:8989",
        describe: "",
        secure: false,
        changeOrigin: true,
        logLwvwe: "debug",
      },
    },
  },
};
