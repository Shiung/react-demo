const getWorldCupGroupTreeList = require('./fakeData/getWorldCupGroupTreeList.js')
const getWorldCupScoreList = require('./fakeData/getWorldCupScoreList')
const getWorldCupGame1 = require('./fakeData/getWorldCupGame1')
const getWorldCupGame2 = require('./fakeData/getWorldCupGame2')
const getWorldCupGame3 = require('./fakeData/getWorldCupGame3')

const getGameResultAll = require('./fakeData/resultFake/getGameResultAll')
const getGameResultMarkets = require('./fakeData/resultFake/getGameResultMarkets')
const getGameResultMarket = require('./fakeData/resultFake/getGameResultMarket')

module.exports = () => ({
  // 世界杯
  getWorldCupGroupTreeList,
  getWorldCupScoreList,
  getWorldCupGame1,
  getWorldCupGame2,
  getWorldCupGame3,
  //  賽果
  getGameResultAll,
  getGameResultMarkets,
  getGameResultMarket
})