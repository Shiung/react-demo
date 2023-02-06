import React, { useMemo } from 'react'
import { MatchObj } from '../../types'
import styles from './ScoreBoard.module.scss'
import Row from './Row'

import FormatMessage from '@/components/FormatMessage'

type BoardScore = {
  key: 'innings-1' | 'innings-2' | 'innings-3' | 'innings-4' | 'innings-5' | 'innings-6' | 'innings-7' | 'innings-8' | 'innings-9' | 'ot',
  homeScore: string,
  awayScore: string
}

const baseballConf: BoardScore[] = [
  { key: 'innings-1', homeScore: '', awayScore: '' },
  { key: 'innings-2', homeScore: '', awayScore: '' },
  { key: 'innings-3', homeScore: '', awayScore: '' },
  { key: 'innings-4' ,homeScore: '', awayScore: '' },
  { key: 'innings-5' ,homeScore: '', awayScore: '' },
  { key: 'innings-6', homeScore: '', awayScore: '' },
  { key: 'innings-7', homeScore: '', awayScore: '' },
  { key: 'innings-8', homeScore: '', awayScore: '' },
  { key: 'innings-9' ,homeScore: '', awayScore: '' },
  { key: 'ot' ,homeScore: '', awayScore: '' }
]


type Props = {
  leagueName: string,
} & Pick<MatchObj, 'homeName' | 'awayName' | 'scoresInfo'>

const Baseball: React.FC<Props> = ({ leagueName, homeName, awayName, scoresInfo }) => {
  const gameList = useMemo(() => {
    if (!scoresInfo.score) return baseballConf
    return baseballConf.map((origin) => {
      const [home, away] = scoresInfo?.score?.[origin.key]?.split('-') ?? []
      return {
        ...origin,
        homeScore: home || '-',
        awayScore: away || '-',
      }
    })
  }, [scoresInfo])
  return (
    <>
      <div className={styles.baseball__title}>
        <Row
          slotFirst={<div className={styles.league}>{leagueName}</div>}
          slotOthers={
            <>
              {gameList.map(({ key }) => {
                const title = key === 'ot'
                  ? <FormatMessage msgCode='sport.basketball.ot' />
                  : key.replace('innings-', '')
                return <div key={key} className={styles.gameTitle}>{title}</div>
              })}
            </>}
          slotOthersLen={gameList.length} />
      </div>
      <div className={styles.baseball__scoreBoard}>
        <Row
          slotFirst={<div className={styles.teamName}>{awayName}</div>}
          slotOthers={
            <>
              {gameList.map(({ awayScore }, idx) => {
                return <div key={`a_score_${idx}`} className={styles.gameScore}>{awayScore}</div>
              })}
            </>}
          slotOthersLen={gameList.length} />
        <Row
          slotFirst={<div className={styles.teamName}>{homeName}</div>}
          slotOthers={
            <>
              {gameList.map(({ homeScore }, idx) => {
                return <div key={`h_score_${idx}`} className={styles.gameScore}>{homeScore}</div>
              })}
            </>}
          slotOthersLen={gameList.length} />
      </div>
    </>
  )
}

export default Baseball
