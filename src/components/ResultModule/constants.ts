/**
 * game result module page type
 */
enum PageType {
  League,
  Tournament,
  Detail
}

enum Sid {
  football = 1,
  basketball = 2,
  tennis = 3,
  baseball = 4
}

const MatchConf = {
  regular: 'regular',
  outright: 'outright'
} as const

const MatchArr = [
  { id: 'regular', keyCode: '賽事' },
  // { id: 'outright', keyCode: 'sport.common.or' }
]

const SelectorConf = {
  date: 'date',
  match: 'match',
  league: 'league'
} as const


const ScoreBoxInSimpleConf: { [key in Sid]: { id: string, i18n: string}[] } = {
  [Sid.football]: [
    { id: 'ht', i18n: '上半场' },
    { id: 'ft-ot', i18n: '全场' },
    { id: 'kickof', i18n: '开赛时间' }],
  [Sid.basketball]: [
    { id: 'h1', i18n:'上半场' },
    { id: 'h2', i18n: '下半场'},
    { id: 'ft', i18n: '全场' },
    { id: 'kickof', i18n: '开赛时间' },],
  [Sid.tennis]: [
    { id: 'fts-set', i18n: '盘' },
    { id: 'total-games', i18n: '总局' },
    { id: 'kickof', i18n: '开赛时间' }],
  [Sid.baseball]: [
    { id: 'f5in', i18n: '前五局' },
    { id: 'ft', i18n: '全场' },
    { id: 'kickof', i18n: '开赛时间' }],
}

enum ResultType {
  REFUND = 'REFUND',
  WIN_HALF = 'WIN_HALF',
  LOSE_HALF = 'LOSE_HALF',
  WINNER = 'WINNER',
  LOSER = 'LOSER',
  DRAW = 'DRAW'
}

export const LAYOUT = {
  id_10: 10,
  id_11: 11,
  id_20: 20,
  id_21: 21,
  id_22: 22,
  id_23: 23,
  id_24: 24,
  id_25: 25,
  id_26: 26,
  id_27: 27,
  id_28: 28,
  id_29: 29,
  id_30: 30,
  id_31: 31,
  id_32: 32,
  id_33: 33,
  id_34: 34,
  id_35: 35,
  id_36: 36,
  id_40: 40,
  id_41: 41,
  id_50: 50,
  id_51: 51,
  id_52: 52,
  id_53: 53,
  id_54: 54,
  id_55: 55,
  id_293: 293,
  id_294: 294,
  /* basketball - WAP */
  id_510: 510,
  id_520: 520,
  id_523: 523,
  id_531: 531,
  /* basketball - PC */
  id_533: 533,
  id_550: 550,
  id_551: 551,
  /* basketball - PC | WAP */
  id_521: 521,
  id_522: 522,
  id_552: 552
}

export {
  PageType,
  Sid,
  ScoreBoxInSimpleConf,
  SelectorConf,
  MatchConf,
  MatchArr,
  ResultType
}