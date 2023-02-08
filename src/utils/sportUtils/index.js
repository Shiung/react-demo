import { initMarketCateTypes, marketMap } from './config'

const sortRulesPairNew = ({ combindObj, compairKey, marketSetting }) => {
  if (!marketSetting || !marketSetting[compairKey]) return false

  const labels = marketSetting[compairKey].labels
  for (const label of labels) {
    !combindObj.has(label) && combindObj.add(label)
  }
}

// 賽果盤口分類排序
const sortMarketlist = ({ markets = [], sortKey, marketSetting, ballType }) => {
  const returnArr = (!sortKey || (sortKey === 'all'))
    ? markets
    : markets.filter(key => (marketSetting[key]?.labels ?? []).some(label => label.includes(marketMap[ballType][sortKey])))

  return returnArr.sort((a, b) => {
    const idxAkey = a === 'others' ? 10000 : (marketSetting[a]?.priority)
    const idxBkey = b === 'others' ? 10000 : (marketSetting[b]?.priority)
    return idxAkey - idxBkey
  })
}

// 賽果盤口分類tag
const getMarketsCateTypesFromArray = (market = [], ballType, marketSetting) => {
  const cateDefault = new Set(initMarketCateTypes[ballType])
  const combindObj = new Set([])

  market.forEach(marketKey => {
    sortRulesPairNew({ combindObj, compairKey: marketKey, marketSetting: marketSetting[ballType] })
  })

  return [...cateDefault].filter(cate => {
    if (cate === 'all') return true
    return combindObj.has(marketMap[ballType][cate])
  })
}

export {
  sortMarketlist,
  getMarketsCateTypesFromArray
}
