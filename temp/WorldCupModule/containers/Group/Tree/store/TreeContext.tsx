import { createContext, useContext, useMemo, useState, useCallback, useEffect } from 'react'

import type { GameInfo } from '@sport/components/WorldCupModule/types'
import {
  StatesConst,
  RoundConf,
  quarterfinalStartTime,
  semifinalStartTime,
  finalStartTime
} from '@sport/components/WorldCupModule/constants'
import { TreeMapConf, LabelConf, LabelPostion, LabelPostionEvent } from '../constants'

import { useWorldCupContext } from '@sport/components/WorldCupModule/store/WorldCupContext'
import { useEliminateContext } from '@sport/components/WorldCupModule/store/EliminateContext'

type TreeContextStore = {
  data?: { [key in TreeMapConf]: GameInfo },
  label: LabelConf,
  labelHandler: (l: LabelConf) => void
}

const TreeContext = createContext<TreeContextStore>({
  label: LabelConf.w16,
  labelHandler: () => {}
  // data: {}
})

type Props = {
  boxRef: React.RefObject<HTMLDivElement>
  isEventPage?: boolean
}

const EmptyGame: GameInfo = {
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
}

const TreeContextProvider: React.FC<Props> = ({ boxRef, isEventPage = false, children }) => {
  const { data: apiData } = useEliminateContext()
  const { servertimeDiff } = useWorldCupContext()
  const [label, setLabel] = useState<LabelConf>(LabelConf.w16)

  const positionHandler = useCallback((v: LabelConf) => {
    const { top, left } = LabelPostion[v]
    window.scrollTo({ top, behavior: 'smooth' })
    boxRef.current?.scrollTo({ left, behavior: 'smooth' })
  }, [boxRef])

  const positionEventHandler = useCallback((v: LabelConf) => {
    const { topId, left } = LabelPostionEvent[v]
    const shift = v === LabelConf.w1
      ? ((document.getElementById(topId)?.children[0]?.getBoundingClientRect()?.height ?? 0) / 2)
      : 0
    const domOffset = document.getElementById(topId)?.offsetTop ?? 0
    const top = domOffset - 100 - 38 - 15 - shift
    window.scrollTo({ top, behavior: 'smooth' })
    boxRef.current?.scrollTo({ left, behavior: 'smooth' })
  }, [boxRef])

  const labelHandler = useCallback((v: LabelConf) => {
    setLabel(v)
    !isEventPage && positionHandler(v)
    isEventPage && positionEventHandler(v)
  }, [positionHandler, positionEventHandler, isEventPage])

  useEffect(() => {
    const domEl = boxRef?.current

    const w16Left = LabelPostion[LabelConf.w16].left
    const w8Left = LabelPostion[LabelConf.w8].left
    const w4Left = LabelPostion[LabelConf.w4].left
    const w1Left = LabelPostion[LabelConf.w1].left

    const center1 = (w8Left - w16Left) / 2
    const center2 = (w4Left - w8Left) / 2 + w8Left
    const center3 = (w1Left - w4Left) / 2 + w4Left

    const eventHandler = (e: TouchEvent) => {
      const scrollLeft = domEl?.scrollLeft ?? 0

      if (scrollLeft < 0) {
        return
      } else if (scrollLeft < center1) {
        boxRef.current?.scrollTo({ left: w16Left, behavior: 'smooth' })
      } else if (center1 < scrollLeft &&  scrollLeft < center2){
        boxRef.current?.scrollTo({ left: w8Left, behavior: 'smooth' })
      } else if (center2 < scrollLeft && scrollLeft < center3) {
        boxRef.current?.scrollTo({ left: w4Left, behavior: 'smooth' })
      } else {
        boxRef.current?.scrollTo({ left: w1Left, behavior: 'smooth' })
      }
    }
    const scrollHandler = (e: Event) => {
      const scrollLeft = domEl?.scrollLeft ?? 0
      if (scrollLeft >= w1Left) {
        setLabel(LabelConf.w1)
      } else if (w4Left <= scrollLeft &&  scrollLeft < w1Left){
        setLabel(LabelConf.w4)
      } else if (w8Left <= scrollLeft && scrollLeft < w4Left) {
        setLabel(LabelConf.w8)
      } else {
        setLabel(LabelConf.w16)
      }
    }

    if (domEl) {
      domEl.addEventListener('touchend', eventHandler)
      domEl.addEventListener('scroll', scrollHandler)
    }
    return () => {
      if (domEl) {
        domEl.removeEventListener('touchend', eventHandler)
        domEl.removeEventListener('scroll', scrollHandler)
      }
    }
  }, [boxRef])

  useEffect(() => {
    // init set position
    const currentTime = new Date().getTime() + servertimeDiff
    if (currentTime > finalStartTime) return labelHandler(LabelConf.w1)
    if (currentTime > semifinalStartTime) return labelHandler(LabelConf.w4)
    if (currentTime > quarterfinalStartTime) return labelHandler(LabelConf.w8)
  }, [labelHandler, servertimeDiff])

  const data = useMemo(() => {
    return {
      [TreeMapConf.w49]: apiData.find(({ sortId }) => sortId === TreeMapConf.w49) || EmptyGame,
      [TreeMapConf.w50]: apiData.find(({ sortId }) => sortId === TreeMapConf.w50) || EmptyGame,
      [TreeMapConf.w51]: apiData.find(({ sortId }) => sortId === TreeMapConf.w51) || EmptyGame,
      [TreeMapConf.w52]: apiData.find(({ sortId }) => sortId === TreeMapConf.w52) || EmptyGame,
      [TreeMapConf.w53]: apiData.find(({ sortId }) => sortId === TreeMapConf.w53) || EmptyGame,
      [TreeMapConf.w54]: apiData.find(({ sortId }) => sortId === TreeMapConf.w54) || EmptyGame,
      [TreeMapConf.w55]: apiData.find(({ sortId }) => sortId === TreeMapConf.w55) || EmptyGame,
      [TreeMapConf.w56]: apiData.find(({ sortId }) => sortId === TreeMapConf.w56) || EmptyGame,
      [TreeMapConf.w57]: apiData.find(({ sortId }) => sortId === TreeMapConf.w57) || EmptyGame,
      [TreeMapConf.w58]: apiData.find(({ sortId }) => sortId === TreeMapConf.w58) || EmptyGame,
      [TreeMapConf.w59]: apiData.find(({ sortId }) => sortId === TreeMapConf.w59) || EmptyGame,
      [TreeMapConf.w60]: apiData.find(({ sortId }) => sortId === TreeMapConf.w60) || EmptyGame,
      [TreeMapConf.w61]: apiData.find(({ sortId }) => sortId === TreeMapConf.w61) || EmptyGame,
      [TreeMapConf.w62]: apiData.find(({ sortId }) => sortId === TreeMapConf.w62) || EmptyGame,
      [TreeMapConf.w63]: apiData.find(({ sortId }) => sortId === TreeMapConf.w63) || EmptyGame,
      [TreeMapConf.w64]: apiData.find(({ sortId }) => sortId === TreeMapConf.w64) || EmptyGame,
    }
  }, [apiData])

  const contextVal: TreeContextStore = {
    data,
    label,
    labelHandler
  }

  return (
    <TreeContext.Provider value={contextVal}>
      {children}
    </TreeContext.Provider>
  )
}

export const useTreeContext = () => {
  return useContext(TreeContext)
}

export default TreeContextProvider
