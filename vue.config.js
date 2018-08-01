module.exports = {
  devServer: {
    port: 8081,
  },
  baseUrl: process.env.NODE_ENV === 'production'
    ? '/h5/view/560_3.0/offline/' //生产路径
    : '/'//开发路径
}