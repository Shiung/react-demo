import React, { useMemo } from 'react'
import { MatchObj } from '../../types'
import styles from './ScoreBoard.module.scss'
import Row from './Row'

// import FormatMessage from '@/components/FormatMessage'

type BoardScore = {
  key: 'q1' | 'q2' | 'q3' | 'q4' | 'ot' | 'h1' | 'h2' | 'ft',
  i18nTitle: string,
  homeScore: string,
  awayScore: string
}

type BasketballConfType = {
  quarter: BoardScore[],
  htFt: BoardScore[]
}

const basketballConf: BasketballConfType = {
  quarter: [
    { key: 'q1', i18nTitle: 'sport.basketball.q1', homeScore: '', awayScore: '' },
    { key: 'q2', i18nTitle: 'sport.basketball.q2', homeScore: '', awayScore: '' },
    { key: 'q3', i18nTitle: 'sport.basketball.q3', homeScore: '', awayScore: '' },
    { key: 'q4' ,i18nTitle: 'sport.basketball.q4', homeScore: '', awayScore: '' },
    { key: 'ot' ,i18nTitle: 'sport.basketball.ot', homeScore: '', awayScore: '' }],
  htFt: [
    { key: 'h1', i18nTitle: 'sport.basketball.1h', homeScore: '', awayScore: '' },
    { key: 'h2', i18nTitle: 'sport.basketball.2h', homeScore: '', awayScore: '' },
    { key: 'ot', i18nTitle: 'sport.basketball.ot', homeScore: '', awayScore: '' }],
}

type Props = {
  leagueName: string,
} & Pick<MatchObj, 'homeName' | 'awayName' | 'scoresInfo'>

const Basketball: React.FC<Props> = ({ leagueName, homeName, awayName, scoresInfo }) => {
  const gameList = useMemo(() => {
    if (!scoresInfo.score) return basketballConf.quarter
    const { q1, q2, q3, q4, h1, h2 } = scoresInfo.score
    const isHtFtGame = (h1 || h2) && (!q1 && !q2 && !q3 && !q4)

    return isHtFtGame
      ? basketballConf.htFt.map((origin) => {
          const [home, away] = scoresInfo?.score?.[origin.key]?.split('-') ?? []
          return {
            ...origin,
            homeScore: home || '-',
            awayScore: away || '-'
          }})
      : basketballConf.quarter.map((origin) => {
          const [home, away] = scoresInfo?.score?.[origin.key]?.split('-') ?? []
          return {
            ...origin,
            homeScore: home || '-',
            awayScore: away || '-'
          }
      })
  }, [scoresInfo])

  return (
    <>
      <div className={styles.basketball__title}>
        <Row
          slotFirst={<div className={styles.league}>{leagueName}</div>}
          slotOthers={
            <>
              {gameList.map(({ i18nTitle }) => {
                return <div key={i18nTitle} className={styles.gameTitle}>
                  {/* <FormatMessage msgCode={i18nTitle} /> */}
                  {i18nTitle}
                  </div>
              })}
            </>}
          slotOthersLen={gameList.length} />
      </div>

      <div className={styles.basketball__scoreBoard}>
        <Row
          slotFirst={<div className={styles.teamName}>{homeName}</div>}
          slotOthers={
            <>
              {gameList.map(({ homeScore }, idx) => {
                return <div key={`h_score_${idx}`} className={styles.gameScore}>{homeScore}</div>
              })}
            </>}
          slotOthersLen={gameList.length} />
        <Row
          slotFirst={<div className={styles.teamName}>{awayName}</div>}
          slotOthers={
            <>
              {gameList.map(({ awayScore }, idx) => {
                return <div key={`a_score_${idx}`} className={styles.gameScore}>{awayScore}</div>
              })}
            </>}
          slotOthersLen={gameList.length} />
      </div>
    </>
  )
}

export default Basketball
