import { useMemo } from 'react'
// import { dateTransformMethod } from '@sport/utils/dateTransform'

import { StatesConst } from '../../../constants'//'@sport/components/WorldCupModule/constants'
import type { GameInfo } from '../../../types'

const useHeader = ({
  kickOffTime, statePhase,
}: Pick<GameInfo, 'kickOffTime' | 'statePhase'>) => {
  const { cusDDMM, HHmm } = useMemo(() => {
    // dateTransformMethod(kickOffTime, true) as any
    return {
      cusDDMM: '25/12',
      HHmm: '23:35'
    }
  }, [kickOffTime])
  const isInplay = statePhase === StatesConst.INPLAY
  const isNotStart = statePhase === StatesConst.NON_START
  const isEnd = statePhase === StatesConst.CLOSED 

  return {
    cusDDMM,
    HHmm,
    isInplay,
    isNotStart,
    isEnd
  }
}

export {
  useHeader
}
