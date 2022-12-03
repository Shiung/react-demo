import { useMemo } from 'react'
import type { GameInfoLs } from '@sport/components/WorldCupModule/types'
import { StatesConst } from '@sport/components/WorldCupModule/constants'
import GameCard, { ModalType } from '@sport/components/WorldCupModule/components/GameCard'

const Schedule: React.FC<{ ls: GameInfoLs }> = ({ ls }) => {
  const shiftPageIndex = useMemo(() => {
    const inplayIndex = ls.findIndex(({ statePhase }) => statePhase === StatesConst.INPLAY)
    const notStartIndex = ls.findIndex(({ statePhase }) => statePhase === StatesConst.NON_START)
    
    if (inplayIndex === -1) {
      if (notStartIndex === -1) return ls.length -1
      return notStartIndex
    } else {
      if (notStartIndex === -1) return inplayIndex
      return Math.min(inplayIndex, notStartIndex)
    }
  }, [ls])

  return (
    <>
      {ls.map((game, idx) =>
        <GameCard key={`${game.iid}-${game.sortId}`} info={game} modal={ModalType.scheduleName} isShiftPos={shiftPageIndex === idx} />)}
    </>
  )
}

export default Schedule
