// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.join(__dirname, 'src')
      }
    },
    entry: {
      app: path.join(__dirname, 'src', 'client', 'main.ts')
    }
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