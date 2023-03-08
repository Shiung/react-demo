import { useCallback } from 'react'
import { useGameInfo } from '../../hooks/useHeader'
import { Sid } from '../../../constants'
import { history } from '@/utils'
import { CATEGORIES } from '@/constants'
import * as ShowTime from './ShomTime'
import styles from './Header.module.scss'

const Header = () => {
  const {
    tnName,
    mkCount,
    sid,
    iid,
    inplay,
    vd,
    period,
    ts,
    clockStopped,
    stoppageTime,
    time,
    series,
    setScore,
    out,
    serverTime,
    kickoffTime
  } = useGameInfo()

  const clickHandler = useCallback(() => {
    const pushHandler = (url: string) => history.push(url)
    const url = `/${inplay ? CATEGORIES.INPLAY : CATEGORIES.EARLY}/${Sid[sid]}/match/${iid}/${vd ?? 'a'}`
    pushHandler(url)
  }, [inplay, sid, vd, iid])

  return (
    <div className={styles.header}>
      <div className={styles.time}>
        {sid === Sid.football
          && <ShowTime.Football {...{ inplay, period, ts, clockStopped, stoppageTime, time, serverTime, kickoffTime }} />}
        {sid === Sid.basketball
          && <ShowTime.Basketball {...{ inplay, period, ts, series, clockStopped, time, serverTime, kickoffTime }} />}
        {sid === Sid.tennis
          && <ShowTime.Tennis {...{ inplay, period, setScore, kickoffTime }}/>}
        {sid === Sid.baseball
          && <ShowTime.Baseball {...{ inplay, out, period, kickoffTime }} />}
      </div>
      <div className={styles.league}>{tnName}</div>
      <div className={styles.more} onClick={clickHandler}>{mkCount}</div>
    </div>
  )
}

export default Header
