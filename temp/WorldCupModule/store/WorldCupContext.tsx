import { useRef, useState, useEffect, useCallback, useContext, createContext } from 'react'
import { useSelector } from 'react-redux'
import { history } from '@sport/utils'

import SportsApi from '@sport/api/SportsApi'

import type { GroupMapping, ScoreInfoLs } from '../types'

type WorldCupContextStore = {
  groupMapping: GroupMapping,
  scoreLs: Partial<ScoreInfoLs>,
  servertimeDiff: number
}

const WorldCupContext = createContext<WorldCupContextStore>({
  groupMapping: [],
  scoreLs: {},
  servertimeDiff: 0
})

const WorldCupContextProvider: React.FC = (props) => {
  const [groupMapping, setGroupMapping] = useState<GroupMapping>([])
  const [scoreLs, setScoreLs] = useState<Partial<ScoreInfoLs>>({})
  const [servertimeDiff, setServertimeDiff] = useState<number>(0)
  // const [open, setOpen] = useState<boolean>(true)
  const isDestory = useRef<boolean>(false)
  const worldCupStatus = useSelector<any, boolean>(state => state.sports.worldCupStickyStatus)

  const fetchData = useCallback(async () => {

    const res = await new SportsApi().getWorldCupGroupTreeList()
    const scoreRes = await new SportsApi().getWorldCupScoreList()
    const switchRes = await new SportsApi().getWorldCupSwitch()

    if (isDestory.current) return

    if (!(res instanceof Error)) {
      setGroupMapping(res)
    }

    if (!(scoreRes instanceof Error)) {
      setScoreLs(scoreRes)
    }

    if (switchRes.code === 0) {
      const timeDiff = new Date().getTime() - switchRes.time
      setServertimeDiff(timeDiff)
      // setOpen(switchRes?.data?.switch ?? true)
    }
  }, [])

  useEffect(() => {
    isDestory.current = false
    fetchData()
    return () => {
      isDestory.current = true
    }
  }, [fetchData])

  useEffect(() => {
    if (!worldCupStatus) history.replace('/')
  }, [worldCupStatus])

  // useEffect(() => {
  //   if (!open) history.replace('/')
  // }, [open])

  const contextVal = {
    groupMapping,
    scoreLs,
    servertimeDiff
  }

  return (
    <WorldCupContext.Provider value={contextVal}>
      {props.children}
    </WorldCupContext.Provider>
  )
}

export const useWorldCupContext = () => {
  return useContext(WorldCupContext)
}

export default WorldCupContextProvider
