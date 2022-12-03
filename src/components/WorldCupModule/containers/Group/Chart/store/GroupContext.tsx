import { useState, useCallback, createContext, useContext } from 'react'

import { RoundConf } from '../../../../constants' //'@sport/components/WorldCupModule/constants'

type GroupContextStore = {
  active: RoundConf | null,
  isEventPage: boolean,
  activeHander: (a: RoundConf) => void
}

const GroupContext = createContext<GroupContextStore>({
  active: null,
  isEventPage: false,
  activeHander: () => {} 
})

const GroupContextProvider: React.FC<{ isEventPage?: boolean }> = ({ children, isEventPage = false }) => {
  const [active, setActive] = useState<RoundConf | null>(null)
  const activeHander = useCallback((v: RoundConf) => setActive(v), [])

  const contextVal = {
    active,
    isEventPage,
    activeHander
  }

  return (
    <GroupContext.Provider value={contextVal}>
      {children}
    </GroupContext.Provider>
  )
}

export const useGroupContext = () => {
  return useContext(GroupContext)
}

export default GroupContextProvider
