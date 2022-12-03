import { createContext, useContext } from 'react'

import type { GameInfoLs, GroupDataLs } from '../types' //'@sport/components/WorldCupModule/types'

import { useGroupData, useFetchWorldCupData } from './hooks'

type GroupRoundContextStore = {
  data: GameInfoLs,
  groupData: GroupDataLs
}

const GroupRoundContext = createContext<GroupRoundContextStore>({
  data: [],
  groupData: []
})

const GroupRoundContextProvider: React.FC = (props) => {
  const { data } = useFetchWorldCupData({ fetchType: 2 })
  const groupData = useGroupData(data)

  const contextVal: GroupRoundContextStore = {
    data,
    groupData
  }

  return (
    <GroupRoundContext.Provider value={contextVal}>
      {props.children}
    </GroupRoundContext.Provider>
  )
}

export const useGroupRoundContext = () => {
  return useContext(GroupRoundContext)
}

export default GroupRoundContextProvider
