import { useState, useCallback, useRef, useEffect, useContext, createContext } from 'react'
// import { useSelector } from 'react-redux'
// import SportsApi from '@sport/api/SportsApi'

import { Sid, worldCupTid } from '../constants' // '@sport/components/WorldCupModule/constants'
import type { GameInfoLs } from '../types' // '@sport/components/WorldCupModule/types'

let timer: ReturnType<typeof setTimeout>
const debounce = function (func: () => void) {
  return function () {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(null)
    }, 3000)
  }
}

const emptyLs: GameInfoLs = []

type StreamContextStore = {
  ls: GameInfoLs
}

const StreamContext = createContext<StreamContextStore>({
  ls: emptyLs
})

const emptyEvent: Array<{ sid: Sid, tid: number }> = []

const StreanContextProvider: React.FC = (props) => {
  const [ls, setLs] = useState<GameInfoLs>(emptyLs)
  const isDestory = useRef<boolean>(false)
  // const eventsList = useSelector((state: any) => state?.sports?.eventsList)

  const fetchData = useCallback(async () => {
    // const res = await new SportsApi().getWorldCupStreamingList()
    // if (isDestory.current) return
    // if (res.code === 0) {
    //   const list = res?.data?.stream ?? []
    //   if (list.length > 4) list.length = 4
    //   setLs(list)
    // } else {
    //   setLs(emptyLs)
    // }
  }, [])

  useEffect(() => {
    isDestory.current = false
    fetchData()
    return () => {
      isDestory.current = true
    }
  }, [fetchData])

  // useEffect(() => {
  //   const isRefetch = eventsList.some(({ sid, tid }: { sid: Sid, tid: number }) => {
  //     return sid === Sid.football && tid === worldCupTid
  //   })

  //   if (isRefetch) debounce(fetchData)()
  // }, [fetchData, eventsList])

  const contextVal = { ls }

  return (
    <StreamContext.Provider value={contextVal}>
      {props.children}
    </StreamContext.Provider>
  )
}

export const useStreamContext = () => {
  return useContext(StreamContext)
}

export default StreanContextProvider
