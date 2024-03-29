export type ApiMapping = {
  [key in string]: { path: string, method: 'get' | 'post', isFake?: boolean }
}

const apiPathMapping: ApiMapping = {
  // 世界杯
  getWorldCupGroupTreeList: { path: '/getWorldCupGroupTreeList', method: 'get', isFake: true },
  getWorldCupScoreList: { path: '/getWorldCupScoreList', method: 'get', isFake: true },
  // 預選賽
  getWorldCupGame1: { path: '/getWorldCupGame1', method: 'get', isFake: true },
  // 分組賽
  getWorldCupGame2: { path: '/getWorldCupGame2', method: 'get', isFake: true },
  // 淘汰賽
  getWorldCupGame3: { path: '/getWorldCupGame3', method: 'get', isFake: true },

  // 賽果 ===================
  getGameResultAll: { path: '/getGameResultAll', method: 'get', isFake: true },
  getGameResultMarkets: { path: '/getGameResultMarkets', method: 'get', isFake: true },
  getGameResultMarket: { path: '/getGameResultMarket', method: 'get', isFake: true },

  // 推薦卡片 ===============
  getPopularInfo: { path: '/getPopularInfo', method: 'get', isFake: true }
}

export default apiPathMapping
