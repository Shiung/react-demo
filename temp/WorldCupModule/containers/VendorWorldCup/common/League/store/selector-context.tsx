import React, { useState, useEffect, useCallback } from 'react'
import FormatMessage from '@sport/components/FormatMessage'
import { RoundConf } from '@sport/components/WorldCupModule/constants'

type SelectorContextObj = {
  items: RoundConf[]
  addItem: (round: RoundConf) => void
  removeItem: (round: RoundConf) => void
  removeItemAll: () => void
}

const Toast = ({ count }: { count: number }) => {
  return (
    <div
      style={{
        position: 'fixed',
        width: '100vw',
        height: '100vh',
        top: '0',
        left: '0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div
        style={{
          fontSize: '18px',
          letterSpacing: '1px',
          width: '315px',
          minHeight: '58px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '10px',
          color: '#fff',
          backgroundColor: 'rgba(0, 0, 0, .5)'
        }}
      >
        <FormatMessage msgCode='select.limit' values={{ count }} />
      </div>
    </div>
  )
}

export const SelectorContext = React.createContext<SelectorContextObj>({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  removeItemAll: () => {}
})

const SelectorContextProvider: React.FC<{ limit: number }> = props => {
  const [select, setSelect] = useState<RoundConf[]>([])
  const [tip, setTip] = useState<boolean>(false)

  const addSelectHandler = useCallback(
    (round: RoundConf) => {
      const alreadySelected = new Set(select).has(round)
      if (alreadySelected) return setSelect(prev => prev.filter(i => i !== round))
      if (select.length >= props.limit) return setTip(prev => !prev)
      setSelect(prev => prev.concat(round))
    },
    [props.limit, select]
  )

  const removeSelectHandler = useCallback((round: RoundConf) => {
    setSelect(prev => prev.filter(i => i !== round))
  }, [])

  const removeSelectHandlerAll = useCallback(() => setSelect([]), [])

  const contextValue: SelectorContextObj = {
    items: select,
    addItem: addSelectHandler,
    removeItem: removeSelectHandler,
    removeItemAll: removeSelectHandlerAll
  }

  useEffect(() => {
    if (tip) {
      setTimeout(() => setTip(false), 3000)
    }
  }, [tip])

  return (
    <SelectorContext.Provider value={contextValue}>
      {props.children}
      {tip && <Toast count={props.limit} />}
    </SelectorContext.Provider>
  )
}

export const useSelectContext = () => {
  return React.useContext(SelectorContext)
}

export default SelectorContextProvider
