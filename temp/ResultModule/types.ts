import { Sid, ResultType, MatchConf, SelectorConf } from './constants'

type SelectorTypes = keyof typeof SelectorConf

type BallType = keyof typeof Sid
type MathType = keyof typeof MatchConf

type MatchObj = {
  awayName: string,
  homeName: string,
  awayId: number,
  homeId: number,
  kickOff: number,
  scoresInfo: { [key: string]: { [key: string]: string }},
  cancelReason: string,
  iid: number
}

type TournamentObj = {
  tid: number,
  tnName: string,
  matches: MatchObj[]
}

type CategoriesObj = {
  cid: number,
  catName: string,
  tournaments: TournamentObj[]
}

/**
 * 下拉選擇器 select option type
 */
type SelectedObj = {
  id: string,
  text: string | React.ReactNode,
  url: string
}
type SelectList = SelectedObj[]

/**
 * 賽果總盤分類
 */

type MarketCatObj = {
  id: string,
  i18n: string
}
type MarketCatList = MarketCatObj[]


/**
 * unit market result
 */
type MarketResultObj = {
  k: string,
  betOn: string,
  result: ResultType
}
type UnitMarketList = MarketResultObj[]

/**
 * 重組 result data for 換面使用
 */
type ParseMarketResultObj = MarketResultObj & {
  /**
   * parseTitle
   */
  title: string,

  /**
   * save unit betOn setting from global setting
   */
  settingBetOn: {
    display: string,
    key: string
  }
}

type ParseMarketResultObjList = ParseMarketResultObj[]

export type {
  MatchObj,
  TournamentObj,
  CategoriesObj,
  BallType,
  MathType,
  SelectorTypes,
  SelectedObj,
  SelectList,
  MarketCatList,
  MarketResultObj,
  UnitMarketList,
  ParseMarketResultObj,
  ParseMarketResultObjList
}
