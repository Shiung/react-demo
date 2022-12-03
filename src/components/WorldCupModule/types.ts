import { StatesConst, RoundConf } from './constants'

type RoundType = keyof typeof RoundConf

type RoundOnlyGroup = Exclude<
  RoundConf,
  RoundConf.final | RoundConf.quarterfinal | RoundConf.round_of_16 | RoundConf.semifinal | typeof RoundConf['3rd_place_final']
>

type GameInfo = {
  sid: number
  tid: number
  cid: number
  iid: number
  statePhase: StatesConst
  homeId: number
  homeName: string
  awayName: string
  awayId: number
  sortId?: number
  roundType: string
  roundGroup: RoundConf
  roundSort: string
  roundNumber: string
  kickOffTime: number
  scoreList: {
    type: string
    period: string
    home: number
    away: number
  }[]
}

type GameInfoLs = GameInfo[]
type GroupData = {
  group: RoundOnlyGroup
  matches: GameInfo[]
}

type GroupDataLs = GroupData[]

type InfoDetail = {
  period: string
  score: string
  ot: string
  pk: string
  ts: string
  time: string
  clockStopped: string
  stoppageTime: string
}

type StompResInfo = {
  detail?: InfoDetail
}

type ScoreInfo = {
  team: number
  promotion: string
  lift: string
  ranking: number
  P: number
  W: number
  D: number
  L: number
  GF: number
  GA: number
  DIFF: number
  PTS: number
}

type ScoreInfoLs = {
  [key in RoundConf]: ScoreInfo[]
}

type GroupMapping = Array<{ group: RoundConf; teams: number[] }>

type SimpleInfoWorldCupRound = {
  round: {
    roundGroup: RoundConf
  }
}

type WorldCupMenu = {
  sid?: number
  inplay: number
  incoming: { total: number }
  today: { total: number }
  prematch: { total: number }
  outright: number
}

export type {
  RoundType,
  RoundOnlyGroup,
  GameInfo,
  GameInfoLs,
  GroupData,
  GroupDataLs,
  StompResInfo,
  InfoDetail,
  GroupMapping,
  ScoreInfoLs,
  ScoreInfo,
  SimpleInfoWorldCupRound,
  WorldCupMenu
}
