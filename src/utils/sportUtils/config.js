// default(早盤 / 今日)分類類別
const initMarketCateTypes = {
  football: [
    'all',
    'handicap',
    'goals',
    '1h',
    'corners',
    'mins',
    'bookings',
    'special',
    'others'
  ],
  basketball: [
    'all',
    'spread',
    'total',
    'moneyLine',
    'others'
  ],
  tennis: [
    'all',
    'handicap',
    'results',
    'set',
    'game',
    'point',
    'others'
  ],
  baseball: [
    'all',
    'runLine',
    'total',
    'moneyLine',
    'runs',
    'others'
  ],
}

const marketMap = {
  football: {
    handicap: 'ah',
    goals: 'tg',
    '1h': '1st',
    corners: 'cr',
    mins: '15m',
    bookings: 'bo',
    special: 'sp',
    others: 'oth'
  },
  basketball: {
    spread: 'ah',
    total: 'tg',
    moneyLine: '1x2',
    others: 'oth'
  },
  tennis: {
    handicap: 'ah',
    results: 'mat',
    set: 'set',
    game: 'gam',
    point: 'poi',
    others: 'oth'
  },
  baseball: {
    runLine: 'ah',
    total: 'ou',
    moneyLine: '1x2',
    runs: 'tg',
    others: 'oth'
  },
}

export {
  initMarketCateTypes,
  marketMap
}
