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
  { id: 'regular', keyCode: 'common.match' },
  // { id: 'outright', keyCode: 'sport.common.or' }
]

const SelectorConf = {
  date: 'date',
  match: 'match',
  league: 'league'
} as const


const ScoreBoxInSimpleConf: { [key in Sid]: { id: string, i18n: string}[] } = {
  [Sid.football]: [
    { id: 'ht', i18n: 'gameResult.half' },
    { id: 'ft-ot', i18n: 'gameResult.full' },
    { id: 'kickof', i18n: 'gameResult.kickoffDT' }],
  [Sid.basketball]: [
    { id: 'h1', i18n:'gameResult.half' },
    { id: 'h2', i18n: 'gameResult.secondHalf'},
    { id: 'ft', i18n: 'gameResult.full' },
    { id: 'kickof', i18n: 'gameResult.kickoffDT' },],
  [Sid.tennis]: [
    { id: 'fts-set', i18n: 'gameResult.tennis.set' },
    { id: 'total-games', i18n: 'gameResult.tennis.totalGames' },
    { id: 'kickof', i18n: 'gameResult.kickoffDT' }],
  [Sid.baseball]: [
    { id: 'f5in', i18n: 'gameResult.baseball.f5in' },
    { id: 'ft', i18n: 'gameResult.full' },
    { id: 'kickof', i18n: 'gameResult.kickoffDT' }],
}

enum ResultType {
  REFUND = 'REFUND',
  WIN_HALF = 'WIN_HALF',
  LOSE_HALF = 'LOSE_HALF',
  WINNER = 'WINNER',
  LOSER = 'LOSER',
  DRAW = 'DRAW'
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