// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

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
      // new BundleAnalyzerPlugin()
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