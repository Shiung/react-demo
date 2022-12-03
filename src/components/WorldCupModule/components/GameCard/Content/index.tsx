import styles from './Content.module.scss'
import cx from 'classnames'
import { useParseScore, useIswin, useParseInplayScore, useToDetail } from './hooks'

import { StatesConst } from '../../../constants' // '@sport/components/WorldCupModule/constants'
import * as Flag from '../../../components/Flag'
import { BadgeType } from '../../../utils'

// import FormatMessage from '@/sports/components/FormatMessage'

import { useGameContext } from '../store/GameContext'


const InplayScore = () => {
  const { gameInfo: { detail = {} }, isReverse } = useGameContext()
  const { l_score, r_score } = useParseInplayScore(detail)

  return (
    <div className={styles.inplay}>
      <div className={styles['inplay__left']}>{!isReverse ? l_score : r_score}</div>
      <div className={styles['inplay__versus']}>:</div>
      <div className={styles['inplay__right']}>{!isReverse ? r_score : l_score}</div>
    </div>
  )
}

const FinalScore = ({ total = [], pk = [], isReverse = false }: { total?: number[], pk?: number[], isReverse?: boolean }) => {
  const [hScore = '-', aScore = '-'] = total
  
  return (
    <>
      <div className={styles.total}>
        <div className={styles['total__left']}>{!isReverse ? hScore : aScore}</div>
        <div className={styles['total__versus']}>:</div>
        <div className={styles['total__right']}>{!isReverse ? aScore : hScore}</div>
      </div>

      {pk.length > 0 && 
        <div className={styles.pk}>
          <div className={styles['pk__left']}>{!isReverse ? pk[0]: pk[1]}</div>
          <div className={styles['pk__versus']}>PK</div>
          <div className={styles['pk__right']}>{!isReverse? pk[1] : pk[0]}</div>
        </div>
      }
    </>
  )
}

const NormalScore = () => {
  return <div className={styles.normal}>VS</div>
}

const TeamComp = ({ type = 'left', isWin = false, name = '', id }: {
  type: 'left' | 'right',
  name: string,
  id: number,
  isWin?: boolean
}) => {
  return (
    <> 
      {type === 'right' && (
        !!id
          ? <Flag.Circle width={48} isWin={isWin} type={BadgeType.flag} id={id} />
          : <Flag.CircleEmpty width={48} />
      )}
      <div className={styles.teamName}>
        {!!id ? `wcteam_${id}` : '— —'}
      </div>
      {type === 'left' && (
        !!id
          ? <Flag.Circle width={48} isWin={isWin}  type={BadgeType.flag} id={id} />
          : <Flag.CircleEmpty width={48} />
      )}
    </>
  )
}

const TeamCompVertical = ({ isWin = false, name = '', id }: {
  name: string,
  id: number,
  isWin?: boolean
}) => {
  return (
    <> 
      {!!id
        ? <Flag.Circle width={48} isWin={isWin} type={BadgeType.flag} id={id} />
        : <Flag.CircleEmpty width={48} />
      }
      <div className={styles.teamName}>
        {!!id ?`wcteam_${id}` : '— —'}
      </div>
    </>
  )
}

const TeamCompRect = ({ type = 'left', isWin = false, name = '', id }: {
  type: 'left' | 'right',
  name: string,
  id: number,
  isWin?: boolean
}) => {
  return (
    <> 
      {type === 'right' && <Flag.Rect width={40} isWin={isWin} type={BadgeType.flagRect} id={id} />}
      <div className={styles.teamName}>
        {!!id ? `wcteam_${id}` : '— —'}
      </div>
      {type === 'left' && <Flag.Rect width={40} isWin={isWin} type={BadgeType.flagRect} id={id}  />}
    </>
  )
}

const ModalOne: React.FC = () => {
  const {
    apiData: {
      scoreList,
      statePhase,
      homeId,
      homeName,
      awayName,
      awayId,
      iid
    }
  } = useGameContext()

  const isInplay = statePhase === StatesConst.INPLAY
  const isNotStart = statePhase === StatesConst.NON_START
  const isEnd = statePhase === StatesConst.CLOSED

  const scoreParse = useParseScore({ isShowScore: isEnd, scoreList })
  const isWin = useIswin({ isShowResult: isEnd, finalScore: scoreParse })
  const detailHandler = useToDetail({ iid, isInplay, isTrigger: isNotStart || isInplay })

  return (
    <div className={styles.wrapper} onClick={detailHandler}>
      <div  className={styles.left}>
        <TeamComp
          type='left'
          name={homeName}
          isWin={isWin.home}
          id={homeId} />
      </div>
      <div className={styles.score}>
        {isEnd && <FinalScore total={scoreParse?.total} pk={scoreParse?.pk} />}
        {isNotStart && <NormalScore />}
        {isInplay && <InplayScore />}
      </div>
      <div className={styles.right}>
        <TeamComp
          type='right'
          name={awayName}
          isWin={isWin.away}
          id={awayId} />
      </div>
    </div>
  )
}

const ModalTwo: React.FC = () => {
  const {
    isReverse,
    apiData: {
      scoreList,
      statePhase,
      homeId,
      homeName,
      awayName,
      awayId,
      iid
    }
  } = useGameContext()

  const isInplay = statePhase === StatesConst.INPLAY
  const isNotStart = statePhase === StatesConst.NON_START
  const isEnd = statePhase === StatesConst.CLOSED
  
  const scoreParse = useParseScore({ isShowScore: isEnd, scoreList })
  const isWin = useIswin({ isShowResult: isEnd, finalScore: scoreParse })
  const detailHandler = useToDetail({ iid, isInplay, isTrigger: isNotStart || isInplay })

  return (
    <div className={cx(styles.wrapper, styles.modalTwo)} onClick={detailHandler}>
      <div  className={styles.left}>
        <TeamCompRect
          type='left'
          name={!isReverse ? homeName : awayName}
          isWin={!isReverse ? isWin.home : isWin.away}
          id={!isReverse ? homeId : awayId} />
      </div>
      <div className={styles.score}>
        {isEnd && <FinalScore total={scoreParse?.total} pk={scoreParse?.pk} isReverse={isReverse} />}
        {isNotStart && <NormalScore />}
        {isInplay && <InplayScore />}
      </div>
      <div className={styles.right}>
        <TeamCompRect
          type='right'
          name={!isReverse ? awayName : homeName}
          isWin={!isReverse ? isWin.away : isWin.home}
          id={!isReverse ? awayId : homeId} />
      </div>
    </div>
  )
}

const ModalThree: React.FC<{ isChampion?: boolean }> = ({ isChampion = false} ) => {
  const {
    isReverse,
    apiData: {
      scoreList,
      statePhase,
      homeId,
      homeName,
      awayName,
      awayId,
      iid,
      tid
    }
  } = useGameContext()

  const isInplay = statePhase === StatesConst.INPLAY
  const isNotStart = statePhase === StatesConst.NON_START
  const isEnd = statePhase === StatesConst.CLOSED
  
  const scoreParse = useParseScore({ isShowScore: isEnd, scoreList })
  const isWin = useIswin({ isShowResult: isEnd, finalScore: scoreParse })
  const detailHandler = useToDetail({ iid, isInplay, isTrigger: isNotStart || isInplay })

  return (
    <div className={cx(styles.wrapper, styles.modalThree, { [styles.champion]: isChampion })} onClick={detailHandler}>
      <div  className={styles.left}>
        <TeamCompVertical
          name={!isReverse ? homeName : awayName}
          isWin={!isReverse ? isWin.home : isWin.away}
          id={!isReverse ? homeId : awayId} />
      </div>
      <div className={styles.score}>
        {isEnd && <FinalScore total={scoreParse?.total} pk={scoreParse?.pk} isReverse={isReverse} />}
        {isNotStart && <NormalScore />}
        {isInplay && <InplayScore />}
      </div>
      <div className={styles.right}>
        <TeamCompVertical
          name={!isReverse ? awayName : homeName}
          isWin={!isReverse ? isWin.away : isWin.home}
          id={!isReverse ? awayId : homeId} />
      </div>
    </div>
  )
}

export {
  ModalOne,
  ModalTwo,
  ModalThree
}
