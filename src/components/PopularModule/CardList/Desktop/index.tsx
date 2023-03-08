import { memo } from 'react'
import type { PopularList } from '../../types'
import UnitCard from './UnitCard'

type Props = {
  list: PopularList,
}

const CardList = memo(({ list }: Props) => {
  const isOpenMore = list.length === 4
  return (
    <>
      {list.map((ls) => {
        const { sid, iid } = ls
        return <UnitCard key={`${sid}-${iid}`} sid={sid} iid={iid} apiData={ls} />})}
      {isOpenMore && <UnitCard.More />}
    </>
  )
})

CardList.displayName = 'CardList'

export default CardList
