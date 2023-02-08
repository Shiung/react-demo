import React, { useMemo } from 'react'
import { MatchObj } from '../../types'
import styles from './ScoreBoard.module.scss'
import Row from './Row'

// import FormatMessage from '@/components/FormatMessage'

type BoardScore = {
  key: 'set-score-1' | 'set-score-2' | 'set-score-3' | 'set-score-4' | 'set-score-5',
  i18nTitle: string,
  homeScore: string,
  awayScore: string
}

const tennisConf: BoardScore[] = [
  { key: 'set-score-1', i18nTitle: 'gameResult.tennis.sets.wap.0', homeScore: '', awayScore: '' },
  { key: 'set-score-2', i18nTitle: 'gameResult.tennis.sets.wap.1', homeScore: '', awayScore: '' },
  { key: 'set-score-3', i18nTitle: 'gameResult.tennis.sets.wap.2', homeScore: '', awayScore: '' },
  { key: 'set-score-4' ,i18nTitle: 'gameResult.tennis.sets.wap.3', homeScore: '', awayScore: '' },
  { key: 'set-score-5' ,i18nTitle: 'gameResult.tennis.sets.wap.4', homeScore: '', awayScore: '' }
]

type Props = {
  leagueName: string,
} & Pick<MatchObj, 'homeName' | 'awayName' | 'scoresInfo'>

const Tennis: React.FC<Props> = ({ leagueName, homeName, awayName, scoresInfo }) => {
  const gameList = useMemo(() => {
    if (!scoresInfo.score) return tennisConf
    return tennisConf.map((origin) => {
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
      <div className={styles.tennis__title}>
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
      <div className={styles.tennis__scoreBoard}>
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

export default Tennis
