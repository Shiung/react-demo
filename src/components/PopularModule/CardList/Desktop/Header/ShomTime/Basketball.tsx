import { memo } from "react"
// import InplayTimer from "@/components/InplayTimer"
import Interrupted from './Interrupted'
// import { SPORTS } from '@/constants/common'
// import { isShowTime } from '@/utils'
import { useParseGameTime } from '../../../hooks/useHeader'
// import FormatMessage from '@/components/FormatMessage'
// import GamePause from '@components/GamePauseLottie'

import styles from '../Header.module.scss'

type Props = {
  inplay: boolean,
  period: string,
  ts: string,
  series?: string,
  clockStopped: string,
  time: string,
  serverTime: string,
  kickoffTime?: string
}

const Inplay = memo(({
  clockStopped,
  ts,
  time,
  series,
  serverTime,
  period
}: Pick<Props, 'series' | 'clockStopped' | 'ts' | 'time' | 'serverTime' | 'period'>) => {
  const isQ1Q3Paused = /^q(1|3)_(paused)$/.test(period)
  const isTimePause = clockStopped === 'true' || isQ1Q3Paused
  const isHalfTime = ['ht', 'q2_paused'].some(key => key === period)
  const showGamePause = isTimePause && !isHalfTime
  const marketSeries = series || 10
  const isShowPeriodTime = false //isShowTime({ period: period, sportType: SPORTS.BASKETBALL, ignore: false })
  const countingTimer = time && ts && isShowPeriodTime

  const gameTime = isQ1Q3Paused ? `${marketSeries}:00` : time
  return (
    <>
      {/* <FormatMessage msgCode={`sport.${SPORTS.BASKETBALL}.${period}`}/> */}
      {period}
      <span className={styles.basketball__timeBox}>
        {countingTimer && !showGamePause && <>00:00</>} {/*<InplayTimer ts={ts} time={time} serverTime={serverTime} isReverse /> */}
        {showGamePause && gameTime}
        {showGamePause && <span className={styles.basketball__timeOut}>暫停{/*<GamePause />*/}</span>}
      </span>
    </>
  )
})

Inplay.displayName = 'ShowTimeBasketbllInplay'

const Normal = memo(({
  kickoffTime = ''
}: Pick<Props, 'kickoffTime'>) => {
  const { showTime } = useParseGameTime(kickoffTime)
  return <>{showTime}</>
})

Normal.displayName = 'ShowTimeBasketballNormal'

const Basketball = memo<Props>(({
  inplay,
  period,
  ts,
  series,
  clockStopped,
  time,
  serverTime,
  kickoffTime
}) => {
  if (['interrupted', 'not_started'].includes(period)) return <Interrupted period={period} />
  if (inplay) return period ? <Inplay {...{ series, clockStopped, ts, time, serverTime, period }} /> : <></>
  return <Normal kickoffTime={kickoffTime}/>
})

Basketball.displayName = 'ShowTimeBasketball'

export default Basketball
