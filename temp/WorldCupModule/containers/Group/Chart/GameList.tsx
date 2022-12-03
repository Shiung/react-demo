import styles from './Chart.module.scss'
import { useMemo } from 'react'

import GameCard, { ModalType } from '@sport/components/WorldCupModule/components/GameCard'
import { useGroupContext } from './store/GroupContext'
import { useChartContext } from './store/ChartContext'

const GameList = () => {
  const { selectLs, selectSquare } = useChartContext()
  const { isEventPage } = useGroupContext()

  return (
    <div className={styles.gameList}>
      {useMemo(() => {
        return selectLs.map(({ data, isReverse }) =>
          <GameCard
            key={`${selectSquare}-${data.iid}-${data.sortId}`}
            info={data}
            modal={ModalType.chartName}
            isReverse={isReverse}
            useVote={isEventPage} />)
      }, [selectLs, selectSquare, isEventPage])}
    </div>
  )
}

export default GameList
