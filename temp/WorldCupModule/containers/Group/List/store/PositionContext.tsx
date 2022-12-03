import { useState, useCallback, createContext, useContext } from 'react'
import { RoundConf } from '@sport/components/WorldCupModule/constants'

type PositionContextStore = {
  current: RoundConf,
  activeVal: RoundConf | null,
  activeHandler: (v: RoundConf) => void,
  currentHandler: (v: RoundConf) => void,
  resetActiveHandler: () => void
}

const PositionContext = createContext<PositionContextStore>({
  current: RoundConf.A,
  activeVal: null,
  activeHandler: () => {},
  currentHandler: () => {},
  resetActiveHandler: () => {}
})

const PositionContextProvider: React.FC = (props) => {
  const [current, setCurrent] = useState<RoundConf>(RoundConf.A)
  const [activeVal, setActiveVal] = useState< RoundConf | null>(null)
  
  const currentHandler = useCallback((v: RoundConf) => setCurrent(v), [])
  const activeHandler = useCallback((v: RoundConf) => setActiveVal(v), [])

  const resetActiveHandler = useCallback(() => {
    setActiveVal(null)
  }, [])

  const contextVal: PositionContextStore = {
    current,
    activeVal,
    activeHandler,
    currentHandler,
    resetActiveHandler
  }
  
  return (
    <PositionContext.Provider value={contextVal}>
      {props.children}
    </PositionContext.Provider>
  )
}

export const usePositionContext = () => {
  return useContext(PositionContext)
}

export default PositionContextProvider
