import { createContext, useContext } from 'react'

import type { GameInfoLs, GroupDataLs } from '../types' // '@sport/components/WorldCupModule/types'

import { useFetchWorldCupData, useGroupData } from './hooks'

type PreGameContextStore = {
  data: GameInfoLs,
  groupData: GroupDataLs
}

const PreGameContext = createContext<PreGameContextStore>({
  data: [],
  groupData: []
})

const PreGameContextProvider: React.FC = (props) => {
  const { data } = useFetchWorldCupData({ fetchType: 1 })
  const groupData = useGroupData(data)

  const contextVal: PreGameContextStore = {
    data,
    groupData
  }

  return (
    <PreGameContext.Provider value={contextVal}>
      {props.children}
    </PreGameContext.Provider>
  )
}

export const usePreGameContext = () => {
  return useContext(PreGameContext)
}

export default PreGameContextProvider
