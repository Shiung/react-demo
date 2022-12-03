import cx from 'classnames'

import { TreeMapConf } from './constants'
import { useTreeContext } from './store/TreeContext'

import { StatesConst } from '@sport/components/WorldCupModule/constants'
import GameCard from '@sport/components/WorldCupModule/components/GameCard'
import styles from './Tree.module.scss'

const Line: React.FC<{ isWinTop?: boolean, isWinBottom?: boolean, useVote?: boolean }> = ({
  isWinTop = false, isWinBottom = false, useVote = false
}) => {
  return (
    <div className={cx(styles.line, { [styles.hasVote]: useVote })}>
      <div>
        <div className={cx(styles.top, { [styles.active]: isWinTop })} />
        <div className={cx(styles.bottom, { [styles.active]: isWinBottom })} />
      </div>
      <div>
        <div className={cx(styles.middle, { [styles.active]: isWinTop || isWinBottom })} />
      </div>
    </div>
  )
}

const Map = ({ useVote = false }: { useVote?: boolean }) => {
  const { data } = useTreeContext()

  return (
    <div className={styles.map}>
      <div className={cx(styles.round, styles['round__16'])}>
        <div className={styles.group} id='tree16Point'>
          <div className={cx(styles.card, { [styles.hasVote]: useVote })}>
            {data?.[TreeMapConf.w49] && <GameCard info={data[TreeMapConf.w49]} modal='treeMap' useVote={useVote} />}
          </div>
          <Line
            useVote={useVote}
            isWinTop={data?.[TreeMapConf.w49]?.statePhase === StatesConst.CLOSED ?? false}
            isWinBottom={data?.[TreeMapConf.w50]?.statePhase === StatesConst.CLOSED ?? false} />
          <div className={cx(styles.card, { [styles.hasVote]: useVote })}>
            {data?.[TreeMapConf.w50] && <GameCard info={data[TreeMapConf.w50]} modal='treeMap' useVote={useVote} />}
          </div>
        </div>
        <div className={styles.group}>
          <div className={cx(styles.card, { [styles.hasVote]: useVote })}>
            {data?.[TreeMapConf.w53] && <GameCard info={data[TreeMapConf.w53]} modal='treeMap' useVote={useVote} />}
          </div>
          <Line
            useVote={useVote}
            isWinTop={data?.[TreeMapConf.w53]?.statePhase === StatesConst.CLOSED ?? false}
            isWinBottom={data?.[TreeMapConf.w54]?.statePhase === StatesConst.CLOSED ?? false} />
          <div className={cx(styles.card, { [styles.hasVote]: useVote })}>
            {data?.[TreeMapConf.w54] && <GameCard info={data[TreeMapConf.w54]} modal='treeMap' useVote={useVote} />}
          </div>
        </div>
        <div className={styles.group}>
          <div className={cx(styles.card, { [styles.hasVote]: useVote })}>
            {data?.[TreeMapConf.w51] && <GameCard info={data[TreeMapConf.w51]} modal='treeMap' useVote={useVote} />}
          </div>
          <Line
            useVote={useVote}
            isWinTop={data?.[TreeMapConf.w51]?.statePhase === StatesConst.CLOSED ?? false}
            isWinBottom={data?.[TreeMapConf.w52]?.statePhase === StatesConst.CLOSED ?? false} />
          <div className={cx(styles.card, { [styles.hasVote]: useVote })}>
            {data?.[TreeMapConf.w52] && <GameCard info={data[TreeMapConf.w52]} modal='treeMap' useVote={useVote} />}
          </div>
        </div>
        <div className={styles.group}>
          <div className={cx(styles.card, { [styles.hasVote]: useVote })}>
            {data?.[TreeMapConf.w55] && <GameCard info={data[TreeMapConf.w55]} modal='treeMap' useVote={useVote} />}
          </div>
          <Line
            useVote={useVote}
            isWinTop={data?.[TreeMapConf.w55]?.statePhase === StatesConst.CLOSED ?? false}
            isWinBottom={data?.[TreeMapConf.w56]?.statePhase === StatesConst.CLOSED ?? false} />
          <div className={cx(styles.card, { [styles.hasVote]: useVote })}>
            {data?.[TreeMapConf.w56] && <GameCard info={data[TreeMapConf.w56]} modal='treeMap' useVote={useVote} />}
          </div>
        </div>
      </div>
      <div className={cx(styles.round, styles['round__8'])}>
        <div className={styles.group}  id='tree8Point'>
          <div className={cx(styles.card, { [styles.hasVote]: useVote })}>
            {data?.[TreeMapConf.w57] && <GameCard info={data[TreeMapConf.w57]} modal='treeMap' useVote={useVote} />}
          </div>
          <Line
            useVote={useVote}
            isWinTop={data?.[TreeMapConf.w57]?.statePhase === StatesConst.CLOSED ?? false}
            isWinBottom={data?.[TreeMapConf.w58]?.statePhase === StatesConst.CLOSED ?? false} />
          <div className={cx(styles.card, { [styles.hasVote]: useVote })}>
            {data?.[TreeMapConf.w58] && <GameCard info={data[TreeMapConf.w58]} modal='treeMap' useVote={useVote} />}
          </div>
        </div>
        <div className={styles.group}>
          <div className={cx(styles.card, { [styles.hasVote]: useVote })}>
            {data?.[TreeMapConf.w59] && <GameCard info={data[TreeMapConf.w59]} modal='treeMap' useVote={useVote} />}
          </div>
          <Line
            useVote={useVote}
            isWinTop={data?.[TreeMapConf.w59]?.statePhase === StatesConst.CLOSED ?? false}
            isWinBottom={data?.[TreeMapConf.w60]?.statePhase === StatesConst.CLOSED ?? false} />
          <div className={cx(styles.card, { [styles.hasVote]: useVote })}>
            {data?.[TreeMapConf.w60] && <GameCard info={data[TreeMapConf.w60]} modal='treeMap' useVote={useVote} />}
          </div>
        </div>
      </div>
      <div className={cx(styles.round, styles['round__4'])}>
        <div className={styles.group}  id='tree4Point'>
          <div className={cx(styles.card, { [styles.hasVote]: useVote })}>
            {data?.[TreeMapConf.w61] && <GameCard info={data[TreeMapConf.w61]} modal='treeMap' useVote={useVote} />}
          </div>
          <Line
            useVote={useVote}
            isWinTop={data?.[TreeMapConf.w61]?.statePhase === StatesConst.CLOSED ?? false}
            isWinBottom={data?.[TreeMapConf.w62]?.statePhase === StatesConst.CLOSED ?? false} />
          <div className={cx(styles.card, { [styles.hasVote]: useVote })}>
            {data?.[TreeMapConf.w62] && <GameCard info={data[TreeMapConf.w62]} modal='treeMap' useVote={useVote} />}
          </div>
        </div>
      </div>
      <div className={cx(styles.round, styles['round__champion'])}>
        <div className={styles.group} id='tree1Point'>  
          <div className={cx(styles.card, styles.first)}>
            {data?.[TreeMapConf.w64] && <GameCard info={data[TreeMapConf.w64]} modal='champion' useVote={useVote} />}
          </div>
          <div className={cx(styles.card, styles.third, { [styles.hasVote]: useVote })}>
            {data?.[TreeMapConf.w63] && <GameCard info={data[TreeMapConf.w63]} modal='3rdPlace' useVote={useVote} />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Map
