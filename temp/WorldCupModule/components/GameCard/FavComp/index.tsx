import { memo, useState, useCallback, useEffect } from 'react'
import { CollectN, CollectA } from '@sportIcons/index'
import { useDispatch, useSelector } from 'react-redux'
import { postFavorMatches, deleteFavorMatches } from '@sport/actions/sportsAction'
import { executePortalAction, getLocation } from '@sport/utils'

import cx from 'classnames'

import styles from './Fav.module.scss'

type Props = {
  width: number,
  cusCss: string,
  iid: number,
  tid: number
}

const FavComp = memo<Props>(({ width, cusCss, iid, tid }) => {
  const [active, setActive] = useState<boolean>(false)
  const token = useSelector((state: any) => state?.user?.info?.token)
  const { match } = useSelector((state: any) => state?.sports?.favorList)
  const dispatch = useDispatch()
  
  useEffect(() => {
    const iidSet = match?.filter((el: { sid: number }) => el.sid === 1)[0]?.iidSet ?? []
    const isActive = iidSet.some((el: number) => el === iid)
    setActive(isActive)
  }, [match, iid])

  const clickHandler = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    const path = getLocation().pathname === '/' ? '/sportEvents' : `/sportEvents${getLocation().pathname}`
    if (!token) return executePortalAction({ type: 'page-redirect', data: '/login', history: path })
    const payload = { token, sid: 1, tid, iid }
    dispatch(active ? deleteFavorMatches(payload) : postFavorMatches(payload))
    setActive(!active)
  }, [token, active, iid, tid, dispatch])

  return (
    <div className={cx(styles.wrapper, cusCss)} onClick={clickHandler}>
      {active
        ? <CollectA width={width} height={width}/>
        : <CollectN width={width} height={width}/>
      }
    </div>
  )
})

export default FavComp
