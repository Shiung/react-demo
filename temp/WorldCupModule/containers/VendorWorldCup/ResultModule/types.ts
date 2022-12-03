type MatchObj = {
  awayName: string
  homeName: string
  awayId: number
  homeId: number
  kickOff: number
  scoresInfo: { [key: string]: { [key: string]: string }}
  cancelReason: string
  iid: number
}

type TournamentObj = {
  tid: number
  tnName: string
  matches: { [key in string]: MatchObj[] }
}

export type {
  MatchObj,
  TournamentObj
}
