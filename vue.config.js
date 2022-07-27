module.exports = {
  devServer: {
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        target: process.env.VUE_APP_SERVICE_URL,
        describe: "",
        secure: false,
        changeOrigin: true,
        logLwvwe: "debug",
      },
    },
  },
};
