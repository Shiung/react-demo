import React, { useMemo, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import cx from 'classnames'
import { Sid, ScoreBoxInSimpleConf } from '../../constants'
import { MathType, MatchObj, BallType } from '../../types'
import { parseTotalScore } from '../../utils'
import Row from '../Row'
// import { dateTransformMethod } from '@utils/dateTransform'
import { CATEGORIES } from '@/constants'
import { history } from '@/utils'
import styles from './ContentRow.module.scss'

const CancelComp: React.FC = (props) => {
  return (
    <div className={styles.cancel}>
      取消: {props.children}
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
  // const { HHmm } = dateTransformMethod(kickof) as { HHmm: string }
  return <div className={styles.timeline}>{kickof}</div>
}

type OthersCompProps = {
  iid: number,
  kickOff: number,
  ballType: BallType,
  ls: { id: string }[],
  score?: { [key: string]: string }
}

const scoreEmpty: { [key: string]: string } = {}

const OthersComp = React.memo<OthersCompProps>(({ iid, ls, kickOff, score = scoreEmpty, ballType }) => {
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
                {...(Sid[ballType] === Sid.baseball && { isReverse: true })} />)
            }
          default:
            return (
              <ColComp
                key={`${iid}-${id}`}
                home={<ScoreComp score={score[id]?? ''} type='home' id={id} />}
                away={<ScoreComp score={score[id]?? ''} type='away' id={id} />}
                isFull
                {...(Sid[ballType] === Sid.baseball && { isReverse: true })} />)
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
  const { ballType, match, date, tid } = useParams<{ ballType: BallType, match: MathType, date: string, tid: string }>()
  const ScoreBoxLs = useMemo(() => {
    return ScoreBoxInSimpleConf[Sid[ballType]]
  }, [ballType])

  const clickHandler = useCallback(() => {
    history.push(`/${CATEGORIES.GAMERESULT}/${ballType}/${match}/${date}/${tid}/${iid}`)
  }, [ballType, match, date, tid, iid])

  return (
    <div className={styles.content} onClick={clickHandler}>
      <Row
        slotFirst={
          <ColComp
            home={<CompetitorComp name={homeName} />}
            away={<CompetitorComp name={awayName} />}
            {...(Sid[ballType] === Sid.baseball && { isReverse: true })} />}
        slotOthers={<OthersComp iid={iid} kickOff={kickOff} ls={ScoreBoxLs} score={scoresInfo.score} ballType={ballType} />}
        slotOthersLen={ScoreBoxLs.length} />
        {cancelReason && <CancelComp>{cancelReason}</CancelComp>}
    </div>
  )
}

export default ContentRow
