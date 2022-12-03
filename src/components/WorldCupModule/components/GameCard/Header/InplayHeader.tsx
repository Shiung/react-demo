import { memo } from "react"
// import InplayTimer from "@sport/components/InplayTimer"

import { useGameContext } from '../store/GameContext'

import styles from './Header.module.scss'

const Interrupted = ({ period }: { period: string }) => {
  return (
    <>
      {period === 'interrupted' && 'interrupted'}
      {period === 'not_started' && 'not_started'}
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
  const isShowPeriodTime = false //isShowTime({ period, sportType: SPORTS.FOOTBALL, ignore: false })
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
      {!isShowPeriodTime && period}
      {/* {countingTimer && <InplayTimer ts={ts} time={time} serverTime={serverTime}/>} */}
      {countingTimer && '計時器'}
      {stoppageTime && <span className={styles.stoppageTime}>+{stoppageTime}</span>}
    </div>
  )
})

export default InplayHeader
