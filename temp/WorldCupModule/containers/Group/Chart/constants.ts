import { RoundConf } from '@sport/components/WorldCupModule/constants'
import type { RoundOnlyGroup } from '@sport/components/WorldCupModule/types'

enum SquareType {
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D'
}

type SquareMappingType = {
  [key in SquareType]: { id: number }
}
// 6150,247928,274526,564
const chartMapping: { [key in RoundOnlyGroup]: SquareMappingType } = {
  [RoundConf.A]: {
    [SquareType.A]: { id: 6150 },
    [SquareType.B]: { id: 247928 },
    [SquareType.C]: { id: 274526 },
    [SquareType.D]: { id: 564 }
  },
  [RoundConf.B]: {
    [SquareType.A]: { id: 247956 },
    [SquareType.B]: { id: 247971 },
    [SquareType.C]: { id: 247958 },
    [SquareType.D]: { id: 249513 }
  },
  [RoundConf.C]: {
    [SquareType.A]: { id: 249513 },
    [SquareType.B]: { id: 247958 },
    [SquareType.C]: { id: 247971 },
    [SquareType.D]: { id: 247956 }
  },
  [RoundConf.D]: {
    [SquareType.A]: { id: 247958 },
    [SquareType.B]: { id: 249513 },
    [SquareType.C]: { id: 247956 },
    [SquareType.D]: { id: 247971 }
  },
  [RoundConf.E]: {
    [SquareType.A]: { id: 247971 },
    [SquareType.B]: { id: 249513 },
    [SquareType.C]: { id: 247956 },
    [SquareType.D]: { id: 247958 }
  },
  [RoundConf.F]: {
    [SquareType.A]: { id: 247958 },
    [SquareType.B]: { id: 249513 },
    [SquareType.C]: { id: 247971 },
    [SquareType.D]: { id: 247956 }
  },
  [RoundConf.G]: {
    [SquareType.A]: { id: 247958 },
    [SquareType.B]: { id: 247956 },
    [SquareType.C]: { id: 249513 },
    [SquareType.D]: { id: 247971 }
  },
  [RoundConf.H]: {
    [SquareType.A]: { id: 247958 },
    [SquareType.B]: { id: 249513 },
    [SquareType.C]: { id: 247956 },
    [SquareType.D]: { id: 247971 }
  }
}

export type { SquareMappingType }
export { SquareType, chartMapping }
