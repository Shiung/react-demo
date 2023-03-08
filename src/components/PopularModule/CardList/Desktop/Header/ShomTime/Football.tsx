import { memo } from "react"
// import InplayTimer from "@/components/InplayTimer"
import Interrupted from './Interrupted'
// import { SPORTS } from '@/constants/common'
// import { isShowTime } from '@/utils'
import { useParseGameTime } from '../../../hooks/useHeader'
// import FormatMessage from '@/components/FormatMessage'

import styles from '../Header.module.scss'

type Props = {
  inplay: boolean,
  period: string,
  ts: string,
  clockStopped: string,
  stoppageTime: string,
  time: string,
  serverTime: string,
  kickoffTime?: string
}

const Inplay = memo(({
  stoppageTime,
  clockStopped,
  ts,
  time,
  serverTime,
  period
}: Pick<Props, 'stoppageTime' | 'clockStopped' | 'ts' | 'time' | 'serverTime' | 'period'>) => {
  const isTimePause = clockStopped === 'true'
  const isShowPeriodTime = false // isShowTime({ period: period, sportType: SPORTS.FOOTBALL, ignore: false })
  const countingTimer = time && ts && isShowPeriodTime

  if (isTimePause) return <>{time}</>
  return (
    <>
      {!isShowPeriodTime && period} {/*<FormatMessage msgCode={`sport.${SPORTS.FOOTBALL}.${period}`}/>*/}
      {countingTimer && <>00:00</>} {/*<InplayTimer ts={ts} time={time} serverTime={serverTime}/>*/}
      {stoppageTime && <span className={styles.stoppageTime}>+{stoppageTime}</span>}
    </>
  )
})

Inplay.displayName = 'ShowTimeFootballInplay'

const Normal = memo(({
  kickoffTime = ''
}: Pick<Props, 'kickoffTime'>) => {
  const { showTime } = useParseGameTime(kickoffTime)
  return <>{showTime}</>
})

Normal.displayName = 'ShowTimeFootballNormal'

const Football = memo<Props>(({
  inplay,
  period,
  ts,
  clockStopped,
  stoppageTime,
  time,
  serverTime,
  kickoffTime
}) => {
  if (['interrupted', 'not_started'].includes(period)) return <Interrupted period={period} />
  if (inplay) return period ? <Inplay {...{ clockStopped, stoppageTime, ts, time, serverTime, period }} /> : <></>
  return <Normal kickoffTime={kickoffTime}/>
})

Football.displayName = 'ShowTimeFootball'

export default Football
