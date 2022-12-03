import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { CATEGORIES } from '@sport/constants/common'
import { history } from '@sport/utils'

import { worldCupBallName } from '@sport/components/WorldCupModule/constants'
import type { WorldCupMenu } from '@sport/components/WorldCupModule/types'

const redirectMethod = (url: string) => history.replace(url)

const RedirectWorldCup = () => {
  const worldCupMenu = useSelector<any, WorldCupMenu>(state => state.sports.worldCupMenu)
  const worldCupStatus = useSelector<any, boolean>(state => state.sports.worldCupStickyStatus)

  useEffect(() => {
    if (worldCupStatus) {
      if (worldCupMenu.sid) {
        const {
          inplay: wcIpc = 0,
          incoming: { total: wciImc = 0 },
          today: { total: wcTc = 0 },
          prematch: { total: wcPc = 0 }
          // outright: wcOrc = 0
        } = worldCupMenu
        if (wcIpc !== 0) return redirectMethod(`/${CATEGORIES.INPLAY}/${worldCupBallName}`)
        if (wciImc !== 0) return redirectMethod(`/${CATEGORIES.INCOMING}/${worldCupBallName}`)
        if (wcTc !== 0) return redirectMethod(`/${CATEGORIES.TODAY}/${worldCupBallName}`)
        if (wcPc !== 0) return redirectMethod(`/${CATEGORIES.EARLY}/${worldCupBallName}/interval/next`)
        return redirectMethod(`/${CATEGORIES.OUTRIGHT}/${worldCupBallName}`)
      }
    } else {
      redirectMethod('/')
    }
  }, [worldCupMenu, worldCupStatus])

  return <></>
}

export default RedirectWorldCup
