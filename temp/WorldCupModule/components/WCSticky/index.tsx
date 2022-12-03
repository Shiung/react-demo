
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useRouteMatch } from 'react-router-dom'
import { wouldCupName, wouldCupEventName } from '../../constants'
import Sticky from './Sticky'


const WorldCupEntry = () => {
  const detailMatch = useRouteMatch('/:category/:ballType/match/:iid/:vd')
  const gameResultMatch = useRouteMatch('/gameResult')
  const searchMatch = useRouteMatch('/search')
  const worldCupMatch = useRouteMatch(`/${wouldCupName}`)
  const worldCupEventMatch = useRouteMatch(`/${wouldCupEventName}`)

  const openBetCart = useSelector<any, boolean>(store => store.order.openBetCart)

  const worldCupStickyStatus = useSelector<any, boolean>(store => store.sports.worldCupStickyStatus)

  const isShowSticky = useMemo(() => {
    return !detailMatch && !gameResultMatch && !searchMatch && !worldCupMatch && !openBetCart && !worldCupEventMatch
  }, [detailMatch, gameResultMatch, searchMatch, worldCupMatch, worldCupEventMatch, openBetCart])


  if (!worldCupStickyStatus || !isShowSticky) return null
  return <Sticky />
}

export default WorldCupEntry
