const path = require('path');
const TsconfigPathsPlugin = require('./system_utils/tsconfig-extends-plugin')

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@WorldCup': path.join(__dirname, 'src/components/WorldCupModule'),
      '@BallAnimate': path.join(__dirname, 'src/components/BallAnimate'),
    },
    plugins: {
      add: [
        new TsconfigPathsPlugin()
      ]
    }
  },
};