const path = require('path');
const webpack = require('webpack')
const TsconfigPathsPlugin = require('./system_utils/tsconfig-extends-plugin')

const appVersion = require('./package.json').version || ''

// console.log('appVersion', appVersion)
module.exports = {
  devServer: {
    port: 8000
  },
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@utils': path.join(__dirname, 'src/utils'),
      '@WorldCup': path.join(__dirname, 'src/components/WorldCupModule'),
      '@BallAnimate': path.join(__dirname, 'src/components/BallAnimate'),
      '@Result': path.join(__dirname, 'src/components/ResultModule'),
      '@Popular': path.join(__dirname, 'src/components/PopularModule'),
      '@Promote': path.join(__dirname, 'src/components/Promote'),
    },
    plugins: {
      add: [
        new TsconfigPathsPlugin(),
        new webpack.DefinePlugin({
          // 'process.env.VERSION': appVersion.toString(),
          'process.env.commitHEAD': JSON.stringify(require('child_process').execSync('git rev-parse HEAD').toString())
        })
      ]
    }
  },
};