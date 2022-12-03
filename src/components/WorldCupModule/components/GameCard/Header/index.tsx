import cx from 'classnames'

import { ReactComponent as Label } from '../../../svg/label.svg'
import styles from './Header.module.scss'
import { useHeader } from '../hooks/useHeader'
import { useGameContext } from '../store/GameContext'
import { StatesConst } from '../../../constants' //'@sport/components/WorldCupModule/constants'
import InplayHeader from './InplayHeader'

// import FormatMessage from '@/sports/components/FormatMessage'

const StatePhaseName = ({ statePhase }: { statePhase: StatesConst }) => {
  return (
    <>
      {/* {statePhase === StatesConst.INPLAY && <FormatMessage msgCode='worldCup.inplay'/>}
      {statePhase === StatesConst.NON_START && <FormatMessage msgCode='worldCup.notStarted'/>}
      {statePhase === StatesConst.CLOSED && <FormatMessage msgCode='worldCup.finished'/>} */}
      {statePhase === StatesConst.INPLAY && '進行中'}
      {statePhase === StatesConst.NON_START && '尚未開始'}
      {statePhase === StatesConst.CLOSED && '結束'}
    </>
  )
}

const ModalOne: React.FC = () => {
  const { apiData: { kickOffTime, statePhase } } = useGameContext()
  const { cusDDMM, isInplay, isEnd } = useHeader({ kickOffTime, statePhase })
  return (
    <div className={
      cx(styles.modalOne, {
        [styles.inplay]: isInplay,
        [styles.end]: isEnd
      })}>
      <div className={styles.left}>
        <Label />
        <div className={styles.date}>
          {cusDDMM}
        </div>
        {isInplay && <InplayHeader />}
      </div>
      <div className={cx(styles.right)}>
        <StatePhaseName statePhase={statePhase} />
      </div>
    </div>
  )
}

const ModalTwo: React.FC<{ disableFav?: boolean, disableState?: boolean }> = ({ disableFav = false, disableState = false }) => {
  const { apiData: { kickOffTime, statePhase, iid, tid } } = useGameContext()
  const { cusDDMM, HHmm, isInplay, isNotStart, isEnd } = useHeader({ kickOffTime, statePhase })
  return (
    <div className={
      cx(styles.modalTwo, {
        [styles.inplay]: isInplay,
        [styles.end]: isEnd
      })}>
      <div className={styles.date}>
        {cusDDMM}
      </div>
      {!isEnd && !isInplay && <div className={styles.time}>{HHmm}</div>}
      {isInplay
        ? <InplayHeader />
        : !disableState && (
            <div className={styles.state}>
              <StatePhaseName statePhase={statePhase} />
            </div>
          )
      }
    </div>
  )
}

const ModalThree: React.FC = () => {
  const { apiData: { kickOffTime, statePhase, iid, tid } } = useGameContext()
  const { cusDDMM, HHmm, isInplay, isNotStart } = useHeader({ kickOffTime, statePhase })
  return (
    <div className={
      cx(styles.modalThree, {
        [styles.inplay]: isInplay,
      })}>
      <div className={styles.left}>
        <div className={styles.date}>{cusDDMM}</div>
        {isInplay && <InplayHeader />}
        {isNotStart && <div className={styles.time}>{HHmm}</div>}
      </div>
    </div>
  )
}

const ModalFour: React.FC<{ isChampion?: boolean }> = ({ isChampion = false }) => {
  const { apiData: { kickOffTime, statePhase } } = useGameContext()
  const { cusDDMM, HHmm, isInplay, isEnd, isNotStart } = useHeader({ kickOffTime, statePhase })
  return (
    <div className={
      cx(styles.modalFour, {
        [styles.inplay]: isInplay,
        [styles.end]: isEnd
      })}>
      <img src={require('../../../image/fifa.png').default} alt='fifa' />
      {/* <div>
        {isChampion
          ? <FormatMessage msgCode='worldCup.championship' />
          : <FormatMessage msgCode='worldCup.3rdPlace' />
        }
      </div> */}
      <div>{cusDDMM}</div>
      {isNotStart && <div className={styles.time}>{HHmm}</div>}
      {isInplay && <InplayHeader />}
    </div>
  )
}

export {
  ModalOne,
  ModalTwo,
  ModalThree,
  ModalFour
}
