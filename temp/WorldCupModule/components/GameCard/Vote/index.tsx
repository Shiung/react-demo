import React, { memo, useMemo, useCallback, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import cx from 'classnames'
import styles from '../GameCard.module.scss'
import FormatMessage from '@sport/components/FormatMessage'

import { CATEGORIES } from '@sport/constants/common'
import { worldCupBallName, StatesConst, RoundConf } from '@sport/components/WorldCupModule/constants'

import { useGameContext } from '../store/GameContext'
import { useVoteUserContext } from '@sport/components/WorldCupModule/store/VoteUserContext'

import { history, executePortalAction } from '@sport/utils'

import SportsApi from '@sport/api/SportsApi'

const GameResult = () => {
  const clickHandler = useCallback(() =>
    history.push(`/${CATEGORIES.GAMERESULT}/${worldCupBallName}/regular/today`), [])

  return (
    <div className={styles.gameResult} onClick={clickHandler}>
      <FormatMessage msgCode='gameResult.result' />
    </div>
  )
}

type VoteBtnProps = {
  sortId: number
  homeId: number
  awayId: number
  isReverse: boolean
  callBack: () => void
}

const VoteBtn = memo<VoteBtnProps>(({ sortId, homeId, awayId, isReverse, callBack }) => {
  const token = useSelector<any, string>(store => store.user.info.token)
  const voteHandler = useCallback((teamId: number) => {
    if (!token) return executePortalAction({ type: 'go-login' })
    new SportsApi(token).postWorldCupVote({ sortId, teamId })
    typeof callBack === 'function' && callBack()
  }, [token, sortId, callBack])

  const parseData = useMemo(() => {
    const leftId = !isReverse ? homeId : awayId
    const rightId = !isReverse ? awayId : homeId
    return {
      left: leftId,
      right: rightId,
      leftClose: !leftId,
      rightClose: !rightId,
    }
  }, [isReverse, homeId, awayId])

  return (
    <div className={styles.voteBtn}>
      <div
        onClick={voteHandler.bind(null, parseData.left)}
        className={cx(styles.left, { [styles.close]: parseData.leftClose })} ><FormatMessage msgCode='common.vote' /></div>
      <div
        onClick={voteHandler.bind(null, parseData.right)}
        className={cx(styles.right, { [styles.close]: parseData.rightClose })}><FormatMessage msgCode='common.vote' /></div>
    </div>
  )
})

type VoteResultProps = {
  match: {
    teamId: number
    type: string
    group: RoundConf
    voted: boolean
    count: number
  }[],
  homeId: number
  awayId: number
  isReverse: boolean
}

const VoteResult = memo<VoteResultProps>(({ match, homeId, awayId, isReverse }) => {
  const percent = useMemo(() => {
    const totalCount = match.reduce((total, { count }) => total + count, 0)
    const homeObj = match.find(({ teamId }) => teamId === homeId)
    const awayObj = match.find(({ teamId }) => teamId === awayId)
    const homeCount = homeObj?.count ?? 0
    const awayCount = awayObj?.count ?? 0

    const homePercent = Math.round((homeCount / totalCount) * 100)
    const awayPercent = Math.round((awayCount / totalCount) * 100)

    const leftPercent = isReverse ? awayPercent : homePercent
    const rightPercent = isReverse ? homePercent : awayPercent

    return {
      left: !isNaN(leftPercent) ? leftPercent : 50,
      right: !isNaN(rightPercent) ? rightPercent : 50,
      leftActive: !isReverse ? homeObj?.voted : awayObj?.voted,
      rightActive: !isReverse ? awayObj?.voted : homeObj?.voted
    }
  }, [match, homeId, awayId, isReverse])

  return (
    <div className={styles.voteResult}>
      <div
        className={cx(styles.percent, styles.left, {
          [styles.active]: percent.leftActive })}>{percent.left}%</div>
      <div className={styles.progressBar}>
        <div className={styles.left} style={{ flex: `0 0 ${percent.left}%` }}/>
        <div className={styles.right}/>
      </div>
      <div className={cx(styles.percent, styles.right, {
        [styles.active]: percent.rightActive })}>{percent.right}%</div>
    </div>
  )
})


const Vote = ({ isChampion = false, isLast = false }: { isChampion?: boolean, isLast?: boolean }) => {
  const [hasVote, setHasVote] = useState<boolean>(false)
  const { apiData: { sortId = 0, homeId, awayId, statePhase, roundGroup }, isReverse } = useGameContext()
  const { voteLs } = useVoteUserContext()

  const hasVoteHandler = useCallback(() => setHasVote(true), [])

  const currentVote = useMemo(() => {
    const findCurr = voteLs.find(({ sortId: voteId }) => voteId === sortId)
    return findCurr ?? {
      sortId,
      match: [
        {
          teamId: homeId,
          type: '',
          group: roundGroup,
          voted: false,
          count: 50
        },
        {
          teamId: awayId,
          type: '',
          group: roundGroup,
          voted: false,
          count: 50
        }
      ]
    }
  }, [voteLs, sortId, homeId, awayId, roundGroup])
  useEffect(() => {
    const hasVoteResult = currentVote?.match.some(({ voted }) => voted)
    if (hasVoteResult) setHasVote(hasVoteResult)
  }, [currentVote])

  const voteBoxHandler = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
  }, [])

  return (
    <div className={cx(styles.vote, {
      [styles.last]: isLast,
      [styles.champion]: isChampion,
      [styles.bgWhite]: !(statePhase === StatesConst.NON_START && !hasVote)
    })} onClick={voteBoxHandler}>
      {statePhase === StatesConst.CLOSED && <GameResult />}
      {(statePhase === StatesConst.INPLAY || (statePhase !== StatesConst.CLOSED && hasVote)) && (
        <VoteResult match={currentVote.match} {...{ homeId, awayId, isReverse }} />
      )}
      {(statePhase === StatesConst.NON_START && !hasVote) && (
        <VoteBtn
          {...{ sortId, homeId, awayId, isReverse }}
          callBack={hasVoteHandler}/>
      )}
    </div>
  )
}

export default memo(Vote)
