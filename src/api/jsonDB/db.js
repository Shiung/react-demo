const getWorldCupGroupTreeList = require('./fakeData/getWorldCupGroupTreeList.js')
const getWorldCupScoreList = require('./fakeData/getWorldCupScoreList')
const getWorldCupGame1 = require('./fakeData/getWorldCupGame1')
const getWorldCupGame2 = require('./fakeData/getWorldCupGame2')
const getWorldCupGame3 = require('./fakeData/getWorldCupGame3')

module.exports = () => ({
  getWorldCupGroupTreeList,
  getWorldCupScoreList,
  getWorldCupGame1,
  getWorldCupGame2,
  getWorldCupGame3
})