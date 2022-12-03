import React, { useMemo, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import cx from 'classnames'
import { Sid, ScoreBoxInSimpleConf } from '@sport/components/ResultModule/constants'
import { MathType, MatchObj } from '@sport/components/ResultModule/types'
import { parseTotalScore } from '@sport/components/ResultModule/utils'
import Row from '@sport/components/ResultModule/TournamentPage/Row'
import { dateTransformMethod } from '@sport/utils/dateTransform'
import FormatMessage from '@sport/components/FormatMessage'
import { CATEGORIES } from '@sport/constants/common'
import { history } from '@sport/utils'
import styles from '@sport/components/ResultModule/TournamentPage/ContentRow/ContentRow.module.scss'

import { worldCupBallName } from '@sport/components/WorldCupModule/constants'

const CancelComp: React.FC = (props) => {
  return (
    <div className={styles.cancel}>
      <FormatMessage msgCode='common.cancel' />: {props.children}
    </div>
  )
}

const CompetitorComp: React.FC<{ name: string }> = ({ name }) => {
  return <div className={styles.competitor}>{name}</div>
}

const ScoreComp: React.FC<{ score: string, type: 'home' | 'away', id: string  }> = ({ score = '', type = 'home', id }) => {
  const parseScore = score.split('-')[type === 'home' ? 0 : 1]
  return (
    <div className={cx(styles.score, ['total-games', 'ft', 'ft-ot'].some(key => key === id) ? styles.ft : styles.normal )}>
      {parseScore || '-'}
    </div>
  )
}

const DateComp: React.FC<{ kickof: number}> = ({ kickof }) => {
  // 需要做使用者時區offset，故第二個參數帶true
  const { HHmm } = dateTransformMethod(kickof, true) as { HHmm: string }
  return <div className={styles.timeline}>{HHmm}</div>
}

type OthersCompProps = {
  iid: number
  kickOff: number
  ls: { id: string }[]
  score?: { [key: string]: string }
}

const scoreEmpty: { [key: string]: string } = {}

const OthersComp = React.memo<OthersCompProps>(({ iid, ls, kickOff, score = scoreEmpty }) => {
  return (
    <>
      {ls.map(({ id }) => {
        switch (id) {
          case 'kickof':
            return (
              <ColComp
                key={`${iid}-${id}`}
                singleDom={<DateComp kickof={kickOff}/>}
                isFull
                isSingleCol />
            )
          case 'ft-ot': {
            const [ftKey, otKey] = id.split('-')
            const ftScore = (score[ftKey]?? '').split('-')
            const otScore = (score[otKey]?? '').split('-')

            const finalScore = parseTotalScore(ftScore, otScore)

            return (
              <ColComp
                key={`${iid}-${id}`}
                home={<ScoreComp score={finalScore} type='home' id={id} />}
                away={<ScoreComp score={finalScore} type='away' id={id} />}
                isFull
                />)
            }
          case 'h2-ot': {
            const [h2Key, otKey] = id.split('-')
            const h2Score = (score[h2Key]?? '').split('-')
            const otScore = (score[otKey]?? '').split('-')
            const finalScore = parseTotalScore(h2Score, otScore)

            return (
              <ColComp
                key={`${iid}-${id}`}
                home={<ScoreComp score={finalScore} type='home' id={id} />}
                away={<ScoreComp score={finalScore} type='away' id={id} />}
                isFull
                />)
            }
          default:
            return (
              <ColComp
                key={`${iid}-${id}`}
                home={<ScoreComp score={score[id]?? ''} type='home' id={id} />}
                away={<ScoreComp score={score[id]?? ''} type='away' id={id} />}
                isFull
                />)
        }
      })}
    </>
  )
})

OthersComp.displayName = 'OthersComp'

type ColProps = {
  home?: React.ReactNode,
  away?: React.ReactNode,
  singleDom?: React.ReactNode,
  isFull?: boolean,
  isSingleCol?: boolean,
  isReverse?: boolean
}

const ColComp: React.FC<ColProps> = ({ home, away, singleDom, isFull = false, isSingleCol = false, isReverse = false }) => {
  return (
    <div className={cx(styles.colBox, { [styles.colFull]: isFull })}>
      {isSingleCol
        ? singleDom
        : (
          <>
            <div>{!isReverse ? home : away}</div>
            <div>{!isReverse ? away : home}</div>
          </>
        )
      }
    </div>
  )
}

type ContentRowProps = Pick<MatchObj, 'iid' | 'awayName' | 'homeName' | 'kickOff' | 'scoresInfo' | 'cancelReason'>

const ContentRow: React.FC<ContentRowProps> = ({ homeName = '', awayName = '', iid, kickOff, scoresInfo, cancelReason }) => {
  const { match, date, group } = useParams<{ match: MathType, date: string, group: string }>()
  const ScoreBoxLs = useMemo(() => {
    return ScoreBoxInSimpleConf[Sid.football]
  }, [])

  const clickHandler = useCallback(() => {
    history.push(`/${CATEGORIES.GAMERESULT}/${worldCupBallName}/${match}/${date}/${group}/${iid}`)
  }, [match, date, group, iid])

  return (
    <div className={styles.content} onClick={clickHandler}>
      <Row
        slotFirst={
          <ColComp
            home={<CompetitorComp name={homeName} />}
            away={<CompetitorComp name={awayName} />}
            />}
        slotOthers={<OthersComp iid={iid} kickOff={kickOff} ls={ScoreBoxLs} score={scoresInfo.score} />}
        slotOthersLen={ScoreBoxLs.length} />
        {cancelReason && <CancelComp>{cancelReason}</CancelComp>}
    </div>
  )
}

export default ContentRow
