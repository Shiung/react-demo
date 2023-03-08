import { useEffect, useCallback, useMemo, useState, useRef } from 'react'
// import { useSelector } from 'react-redux'
import { useCardContext } from '../store/cardContext'
// import { dateTransformMethod } from '@utils/dateTransform'
// import FormatMessage from '@/components/FormatMessage'
// import moment from 'moment'
import { Sid } from '../../constants'

const useGameInfo = () => {
  const {
    data: {
      sid = Sid.football,
      iid,
      tnName,
      inplay = false,
      series, // 籃球
      kickoffTime,
      vd
    },
    mkCount,
    gameInfo: { detail = {} },
    serverTime
  } = useCardContext()

  const {
    period,
    ts,
    out = '',
    'set-score': setScore = [],
    clockStopped,
    stoppageTime,
    time
  } = detail

  return {
    sid,
    iid,
    inplay,
    vd,
    tnName,
    mkCount,
    period,
    ts,
    clockStopped,
    stoppageTime,
    time,
    series,
    out,
    setScore,
    serverTime,
    kickoffTime
  }
}

const useParseGameTime = (timestamp: string) => {
  // const timezone = useSelector((state: any ) => state.common.timezone)
  const timezone = 'zh_CN'

  const [showTime, setShowtime] = useState<string>('')
  const isOverDayUpDate = useRef<boolean>(false)
  const timer = useRef<ReturnType<typeof setTimeout>>()
  const { serverTime } = useCardContext()

  const startGameTimeStamp = parseInt(timestamp) * 1000
  const diffTime = (startGameTimeStamp - parseInt(serverTime)) // 毫秒

  const minCount = diffTime / 1000 / 60
  const hourCount = minCount / 60

  const isInDay = hourCount < 24
  const isInMins = minCount < 60

  const gameTime = useMemo<{ cusDDMM: string, HHmm: string }>(() => {
    return { cusDDMM: '', HHmm: '' }
    // if (isInDay) return { cusDDMM: '', HHmm: '' }
    // const time = moment(startGameTimeStamp).utcOffset(timezone)
    // const { cusDDMM, HHmm } = dateTransformMethod(time) as any
    // return {
    //   cusDDMM, HHmm
    // }
  }, [timezone, startGameTimeStamp, isInDay])

  const updateTime = useCallback(() => {
    if (!isInDay && !isOverDayUpDate.current) {
      const { cusDDMM, HHmm } = gameTime
      setShowtime(`${cusDDMM} ${HHmm}`)
      isOverDayUpDate.current = true
    }

    if (isInDay && !isInMins) {
      let hour = Math.floor(hourCount)
      let minute: number = 60
      const diffTime = hourCount - hour
      const countDownMinute = diffTime * 60
      // setShowtime(FormatMessage({ msgCode: 'time.hour', values: { hour } }))
      setShowtime(`${hour} 小時`)

      const timerHandler = () => {
        if (minute < 0) return timer.current && clearTimeout(timer.current)
        const isOverHour = --hour > 0
        let newStr
        if (isOverHour) {
          // newStr = FormatMessage({ msgCode: 'time.hour', values: { hour } })
          newStr = `${hour} 時`
        } else {
          // newStr = FormatMessage({ msgCode: 'time.minute', values: { minute } })
          newStr = `${minute} 分`
          minute--
        }
        setShowtime(newStr)
        timer.current && clearTimeout(timer.current)
        const countDown = isOverHour ? 60 * 60 * 1000 : 60 * 1000
        timer.current = setTimeout(timerHandler, countDown)
      }
      timer.current = setTimeout(timerHandler, countDownMinute * 60 * 1000)
    }

    if (isInMins) {
      let minute = Math.floor(minCount)
      const diffTime = minCount - minute
      const countDownSec = diffTime * 60
      // setShowtime(FormatMessage({ msgCode: 'time.minute', values: { minute } }))
      setShowtime(`${minute} 分`)

      const timerHandlerForMinute = () => {
        minute--
        if (minute < 0) return timer.current && clearTimeout(timer.current)
        // setShowtime(FormatMessage({ msgCode: 'time.minute', values: { minute: minute } }))
        setShowtime(`${minute} 分`)
        timer.current && clearTimeout(timer.current)
        timer.current = setTimeout(timerHandlerForMinute, 60 * 1000)
      }
      timer.current = setTimeout(timerHandlerForMinute, countDownSec * 1000)
    }
  }, [gameTime, isInMins, isInDay, minCount, hourCount])


  useEffect(() => {
    updateTime()
    return () => {
      if (timer.current) clearTimeout(timer.current)
    }
  }, [updateTime])

  return {
    showTime
  }
}

export {
  useGameInfo,
  useParseGameTime
}
