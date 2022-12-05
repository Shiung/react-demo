import { useState, useMemo, useCallback, createContext, useContext } from 'react'

import type { GameInfo, ScoreInfo } from '../../../../types' // '@sport/components/WorldCupModule/types'
import { SquareType } from '../constants'
import type { SquareMappingType } from '../constants'

type ChartContextStore = {
  selectSquare: SquareType,
  selectHandler: (v: SquareType) => void,
  AID: number,
  BID: number,
  CID: number,
  DID: number,
  dataList?: {    
    AtoB?: { data: GameInfo, isReverse: boolean },
    AtoC?: { data: GameInfo, isReverse: boolean },
    AtoD?: { data: GameInfo, isReverse: boolean },
    BtoC?: { data: GameInfo, isReverse: boolean },
    BtoD?: { data: GameInfo, isReverse: boolean },
    CtoD?: { data: GameInfo, isReverse: boolean },
  },
  selectLs: Array<{ data: GameInfo, isReverse: boolean }>
  promotion: {
    [key in SquareType]: string
  }
}

const ChartContext = createContext<ChartContextStore>({
  selectSquare: SquareType.A,
  selectHandler: () => {},
  AID: 0,
  BID: 0,
  CID: 0,
  DID: 0,
  selectLs: [],
  promotion: {
    A: '',
    B: '',
    C: '',
    D: '',
  }
})

type Props = {
  data: GameInfo[],
  mappingConf: SquareMappingType,
  scoreLsMatch?: ScoreInfo[]
}

const ChartContextProvider: React.FC<Props> = ({ children, data, mappingConf, scoreLsMatch }) => {
  const [selectSquare, setSelectSquare] = useState<SquareType>(SquareType.A)

  const AID = mappingConf[SquareType.A].id
  const BID = mappingConf[SquareType.B].id
  const CID = mappingConf[SquareType.C].id
  const DID = mappingConf[SquareType.D].id

  const selectHandler = useCallback((v: SquareType) => setSelectSquare(v), [])

  const dataList = useMemo(() => {
    let AtoB, AtoC ,AtoD ,BtoC ,BtoD ,CtoD
    let isReverse = false

    for (let d of data) {
      const { homeId, awayId } = d

      if ((homeId === AID || awayId === AID) && (homeId === BID || awayId === BID)) {
        isReverse = homeId !== AID
        AtoB = {
          data: d,
          isReverse
        }
      }
      if ((homeId === AID || awayId === AID) && (homeId === CID || awayId === CID)) {
        isReverse = homeId !== AID
        AtoC = {
          data: d,
          isReverse
        }
      }
      if ((homeId === AID || awayId === AID) && (homeId === DID || awayId === DID)) {
        isReverse = homeId !== AID
        AtoD = {
          data: d,
          isReverse
        }
      }
      if ((homeId === CID || awayId === CID) && (homeId === BID || awayId === BID)) {
        isReverse = homeId !== CID
        BtoC = {
          data: d,
          isReverse
        }
      }
      if ((homeId === DID || awayId === DID) && (homeId === BID || awayId === BID)) {
        isReverse = homeId !== BID
        BtoD = {
          data: d,
          isReverse
        }
      }
      if ((homeId === DID || awayId === DID) && (homeId === CID || awayId === CID)) {
        isReverse = homeId !== CID
        CtoD = {
          data: d,
          isReverse
        }
      }
    }

    return {
      AtoB,
      AtoC,
      AtoD,
      BtoC,
      BtoD,
      CtoD
    }
  }, [data, AID, BID, CID, DID])

  const selectLs = useMemo(() => {
    const selectedId = mappingConf[selectSquare].id
    return data
      .filter(({ homeId, awayId }) => [homeId, awayId].some(i => i === selectedId))
      .map((data) => ({
        data,
        isReverse: data.awayId === selectedId
      }))
  }, [selectSquare, data, mappingConf])

  const promotion = useMemo(() => {
    return {
      A: scoreLsMatch?.find(({ team }) => team === AID)?.promotion ?? '',
      B: scoreLsMatch?.find(({ team }) => team === BID)?.promotion ?? '',
      C: scoreLsMatch?.find(({ team }) => team === CID)?.promotion ?? '',
      D: scoreLsMatch?.find(({ team }) => team === DID)?.promotion ?? '',
    }
  }, [scoreLsMatch, AID, BID, CID, DID])

  const contextVal = {
    selectSquare,
    selectHandler,
    AID,
    BID,
    CID,
    DID,
    dataList,
    selectLs,
    promotion
  }

  return (
    <ChartContext.Provider value={contextVal}>
      {children}
    </ChartContext.Provider>
  )
}

export const useChartContext = () => {
  return useContext(ChartContext)
}

export default ChartContextProvider