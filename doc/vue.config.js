const APP_NAME = require('./package.json').name;
const dev = process.env.NODE_ENV === 'development';
const port = 6800;
module.exports = {
  // 防止路由懒加载导致qiankun加载失败
  publicPath: dev ? `${process.env.VUE_APP_API_HOST}:${port}` : './',
  filenameHashing: true,
  devServer: {
    port,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  chainWebpack: (config) => {
    config.module
      .rule('font')
      .test(/.(ttf|otf|eot|woff|woff2)$/)
      .use('url-loader')
      .loader('url-loader')
      .tap(options => ({ name: '/fonts/[name].[hash:8].[ext]' }))
      .end();
  },
  // 自定义webpack配置
  configureWebpack: {
    output: {
      library: `${APP_NAME}-[name]`,
      libraryTarget: 'umd', // 把子应用打包成 umd 库格式
      jsonpFunction: `webpackJsonp_${APP_NAME}`
    }
  }
};
