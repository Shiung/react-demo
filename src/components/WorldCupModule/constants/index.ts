enum Sid {
  football = 1,
  basketball = 2,
  tennis = 3,
  baseball = 4
}

enum StatesConst {
  CLOSED = 'CLOSED',
  NON_START = 'NON_START',
  INPLAY = 'IN_PLAY'
}

enum RoundConf {
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D',
  E = 'E',
  F = 'F',
  G = 'G',
  H = 'H',
  /** 16 強 */
  round_of_16 = 'round_of_16',
  /** 8 強 */
  quarterfinal = 'quarterfinal',
  /** 4 強 */
  semifinal = 'semifinal',
  /** 季軍 */
  '3rd_place_final' = '3rd_place_final',
  /** 冠軍 */
  final = 'final'
}

const worldCupTid = 25330
const worldCupOrcTid = 29211

export { Sid, StatesConst, RoundConf, worldCupTid, worldCupOrcTid }

export * from './routerMapping'
export * from './timePoint'
export * from './periodMapping'
