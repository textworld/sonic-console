const pkg = require('./package.json')

const { defineConfig } = require('@vue/cli-service')
const dynamicThemePlugin = require('./src/webpack/dynamicTheme.js')

const CompressionPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i

module.exports = defineConfig({
  publicPath: process.env.PUBLIC_PATH,

  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].version = pkg.version
      return args
    })
    if (process.env.NODE_ENV === 'production') {
      config.plugin('compressionPlugin').use(
        new CompressionPlugin({
          filename: '[path][base].gz',
          algorithm: 'gzip',
          test: productionGzipExtensions,
          threshold: 10240,
          minRatio: 0.8,
          deleteOriginalAssets: false
        })
      )
    }
  },

  configureWebpack: {
    plugins: [dynamicThemePlugin()]
  },

  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          'border-radius-base': '2px'
        },
        javascriptEnabled: true
      }
    }
  },

  lintOnSave: false,
  transpileDependencies: [],
  productionSourceMap: false,
  devServer: {
    port: 8090, // 端口号，如果端口号被占用，会自动加1
    host: '0.0.0.0', // 主机名， 127.0.0.1，  真机 0.0.0.0
    https: false, //协议
    open: false, //启动服务时自动打开浏览器访问
    proxy: {
      '/api': {
        target: 'http://localhost:8080/',
        ws: true,
        changeOrigin: true //允许跨域
      }
    }
  }
})
