/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const webpack = require('webpack');

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.join(__dirname, 'src')
      }
    },
    entry: {
      app: path.join(__dirname, 'src', 'client', 'main.ts')
    },
    plugins: [
        new webpack.NormalModuleReplacementPlugin(/typeorm$/, function (result) {
          result.request = result.request.replace(/typeorm/, "typeorm/browser")
        })
    ]
  },
  chainWebpack: config => {
    config.plugin('html')
        .tap(args => {
          args[0].title = 'Lazy Kitchen';
          return args;
        })
  },
  pwa: {
    name: 'Lazy Kitchen'
  }
}