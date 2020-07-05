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
  pwa: {
    name: 'Lazy Kitchen'
  }
}