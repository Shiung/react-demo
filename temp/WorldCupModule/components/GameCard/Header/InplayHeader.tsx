import { memo } from "react"
import InplayTimer from "@sport/components/InplayTimer"
import { isShowTime } from '@sport/utils'
import { SPORTS } from '@sport/constants/common'

import { useGameContext } from '../store/GameContext'
import FormatMessage from "@/sports/components/FormatMessage"

import styles from './Header.module.scss'

const Interrupted = ({ period }: { period: string }) => {
  return (
    <>
      {period === 'interrupted' && <FormatMessage msgCode='sport.tennis.interrupted' />}
      {period === 'not_started' && <FormatMessage msgCode='sport.tennis.not_started' />}
    </>
  )
}

const InplayHeader = memo(() => {
  const { gameInfo: { detail }, serverTime } = useGameContext()
  const {
    period = '',
    ts,
    clockStopped,
    stoppageTime,
    time,
  } = detail || {}
  const isTimePause = clockStopped === 'true'
  const isShowPeriodTime = isShowTime({ period, sportType: SPORTS.FOOTBALL, ignore: false })
  const countingTimer = time && ts && isShowPeriodTime

  if (['interrupted', 'not_started'].includes(period)) return (
    <div className={styles.inplayHeader}>
      <Interrupted period={period} />
    </div>
  )
  if (isTimePause) return (
    <div className={styles.inplayHeader}>{time}</div>
  )
  return (
    <div className={styles.inplayHeader}>
      {!isShowPeriodTime && period && <FormatMessage msgCode={`sport.${SPORTS.FOOTBALL}.${period}`}/>}
      {countingTimer && <InplayTimer ts={ts} time={time} serverTime={serverTime}/>}
      {stoppageTime && <span className={styles.stoppageTime}>+{stoppageTime}</span>}
    </div>
  )
})

export default InplayHeader
