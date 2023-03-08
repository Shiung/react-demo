const path = require('path');
const TsconfigPathsPlugin = require('./system_utils/tsconfig-extends-plugin')

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@utils': path.join(__dirname, 'src/utils'),
      '@WorldCup': path.join(__dirname, 'src/components/WorldCupModule'),
      '@BallAnimate': path.join(__dirname, 'src/components/BallAnimate'),
      '@Result': path.join(__dirname, 'src/components/ResultModule'),
      '@Popular': path.join(__dirname, 'src/components/PopularModule'),
    },
    plugins: {
      add: [
        new TsconfigPathsPlugin()
      ]
    }
  },
};