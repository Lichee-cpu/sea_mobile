module.exports = {
  publicPath: './',
  devServer: {
    proxy: {
      '/': {
        target: 'http://localhost:3000',
        describe: '',
        secure: false,
        changeOrigin: true,
        logLwvwe: 'debug',
      },
    },
  },
}
