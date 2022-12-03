import { createContext, useContext } from 'react'

import type { GameInfoLs } from '../types' //'@sport/components/WorldCupModule/types'

import { useFetchWorldCupData } from './hooks'

type EliminateContextStore = {
  data: GameInfoLs
}

const EliminateContext = createContext<EliminateContextStore>({
  data: []
})

const EliminateContextProvider: React.FC = (props) => {
  const { data } = useFetchWorldCupData({ fetchType: 3 })

  const contextVal: EliminateContextStore = {
    data,
  }

  return (
    <EliminateContext.Provider value={contextVal}>
      {props.children}
    </EliminateContext.Provider>
  )
}

export const useEliminateContext = () => {
  return useContext(EliminateContext)
}

export default EliminateContextProvider
