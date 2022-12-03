import React, { useMemo, createContext, useContext } from 'react'
import type { GameInfo } from '@sport/components/WorldCupModule/types'
import { StatesConst, RoundConf } from '@sport/components/WorldCupModule/constants'

import type { StompResInfo } from '@sport/components/WorldCupModule/types'
import { useStompUpdate } from '../hooks/useStomp'

import { useWorldCupContext } from '@sport/components/WorldCupModule/store/WorldCupContext'

type GameConetextStore = {
  isReverse: boolean
  apiData: GameInfo
  gameInfo: StompResInfo
  serverTime: string
}

const GameContext = createContext<GameConetextStore>({
  isReverse: false,
  apiData: {
    sid: 0,
    tid: 0,
    cid: 0,
    iid: 0,
    statePhase: StatesConst.NON_START,
    homeId: 0,
    homeName: '',
    awayName: '',
    awayId: 0,
    roundType: '',
    roundGroup: RoundConf.A,
    roundSort: '',
    roundNumber: '',
    kickOffTime: 0,
    scoreList: []
  },
  gameInfo: {},
  serverTime: ''
})

type Props = {
  apiData: GameInfo
  isReverse?: boolean
}

const GameContextProvider: React.FC<Props> = ({ apiData, isReverse = false, children }) => {
  const { servertimeDiff } = useWorldCupContext()
  const { iid, statePhase } = apiData

  const initServerTime = useMemo(() => {
    return (new Date().getTime() + servertimeDiff).toString()
  }, [servertimeDiff])

  const { infoID, serverTime, gameInfo } = useStompUpdate({ iid, inplay: statePhase === StatesConst.INPLAY, initServerTime })

  const contextVal: GameConetextStore = {
    isReverse,
    apiData,
    gameInfo,
    serverTime
  }

  return (
    <GameContext.Provider value={contextVal}>
      {React.isValidElement(children) &&
        React.cloneElement<any>(children, {
          'data-iid': iid,
          'data-info': infoID
        })}
    </GameContext.Provider>
  )
}

export const useGameContext = () => {
  return useContext(GameContext)
}

export default GameContextProvider
