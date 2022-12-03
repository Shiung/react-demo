import { useRef, useState, useEffect, useCallback } from 'react'
import { groupGameStartTime } from '../../../constants' // '@sport/components/WorldCupModule/constants'
import { useWorldCupContext } from '../../../store/WorldCupContext'

const __counterDisplay = (val: number): number[] =>
  String(val)
    .padStart(2, "0")
    .split("")
    .map((e) => Number(e))

const __getDisplayedCountdownUnits = (timeDiff: number) => {
  return {
    displaySec: __counterDisplay(Math.floor(timeDiff / 1000) % 60),
    displayMin: __counterDisplay(Math.floor(timeDiff / 60 / 1000) % 60),
    displayHour: __counterDisplay(Math.floor(timeDiff / 60 / 60 / 1000) % 24),
    displayDay: __counterDisplay(Math.floor(timeDiff / 24 / 60 / 60 / 1000))
  }
}

const useTimeMachine = (callBack: () => void) => {
  const [sec, setSec] = useState<number[]>([])
  const [min, setMin] = useState<number[]>([])
  const [hour, setHour] = useState<number[]>([])
  const [day, setDay] = useState<number[]>([])
  const timerRef = useRef<ReturnType<typeof setTimeout>>()
  const { servertimeDiff } = useWorldCupContext()

  const updateTimerHandler = useCallback(() => {
    timerRef.current && clearTimeout(timerRef.current)
    const timeDiff = groupGameStartTime - (new Date().getTime() + servertimeDiff)
    let alignCountDown = (timeDiff / 1000) % 60 - Math.floor((timeDiff / 1000) % 60)

    if (timeDiff > 0) {
      const timerHandler = () => {
        const curTimeDiff = groupGameStartTime - (new Date().getTime() + servertimeDiff)
        if (curTimeDiff <= 0) return typeof callBack === 'function' && callBack()
        const { displaySec, displayMin, displayHour, displayDay } = __getDisplayedCountdownUnits(curTimeDiff)
        setSec(displaySec)
        setMin(displayMin)
        setHour(displayHour)
        setDay(displayDay)
        alignCountDown = 1
        timerRef.current && clearTimeout(timerRef.current)
        timerRef.current = setTimeout(timerHandler, alignCountDown * 1000)
      }
      timerRef.current = setTimeout(timerHandler, alignCountDown * 1000)
    } else {
      typeof callBack === 'function' && callBack()
    }
  }, [servertimeDiff, callBack])

  useEffect(() => {
    updateTimerHandler()
    const visibleHandler = () => {
      document.visibilityState === 'visible' && updateTimerHandler()
    }

    if (document) document.addEventListener('visibilitychange', visibleHandler)
    else if (window) window.addEventListener('visibilitychange', visibleHandler)

    return () => {
      timerRef.current && clearTimeout(timerRef.current)
      if (document) document.removeEventListener('visibilitychange', visibleHandler)
      else if (window) window.removeEventListener('visibilitychange', visibleHandler)
    }
  }, [updateTimerHandler])

  return {
    sec,
    min,
    hour,
    day
  }
}

export {
  useTimeMachine
}
