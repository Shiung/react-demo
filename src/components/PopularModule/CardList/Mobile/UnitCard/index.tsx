import { useMemo, memo, useCallback } from 'react'
// import { useSelector } from 'react-redux'
import cx from 'classnames'
import Header from '../Header'
import Content from '../Content'
import Market from '../Market'
import { Sid } from '../../../constants'
import type { DataObj } from '../../../types'
import CardContextProvider from '../../store/cardContext'
// import { getConfig } from '@/config'
// import { history } from '@/utils'
// import { CATEGORIES, BADGE } from '@/constants/common'
// import FormatMessage from '@/components/FormatMessage'
import styles from './UnitCard.module.scss'

// const menuLoopConf = [Sid[Sid.football], Sid[Sid.basketball], Sid[Sid.tennis], Sid[Sid.baseball]]

const UnitMore = memo(() => {
  // const menu = useSelector((state: any) => state.sports.menu)
  const style = useMemo(() => ({
    backgroundImage: `url(${require('../../Desktop/UnitCard/img/popular.png')})` //backgroundImage: `url(${getConfig().FE_CDN_URL}/frontend/fe-images/popular/popular.png)`,
  }), [])

  // const clickHandler = useCallback(() => {
  //   const pushHandler = (url: string) => history.push(url)
  //   const {
  //     [BADGE.inplay]: inplayMenu,
  //     [BADGE.incoming]: incomingMenu,
  //     [BADGE.today]: todayMenu,
  //   } = menu ?? {}

  //   const inplayMatch = menuLoopConf.find(key => inplayMenu[key])
  //   if (inplayMatch) return pushHandler(`${CATEGORIES.INPLAY}/${inplayMatch}`)

  //   const incomingMatch = menuLoopConf.find(key => incomingMenu[key])
  //   if (incomingMatch) return pushHandler(`${CATEGORIES.INCOMING}/${incomingMatch}`)

  //   const todayMatch = menuLoopConf.find(key => todayMenu[key])
  //   if (todayMatch) return pushHandler(`${CATEGORIES.TODAY}/${todayMatch}`)

  //   return pushHandler(`${CATEGORIES.EARLY}/${Sid[Sid.football]}/interval/next`)
  // }, [menu])

  const clickHandler = useCallback(() => {}, [])

  return (
    <div className={cx(styles.box, styles.more)} style={style}>
      <div className={styles.container} onClick={clickHandler}>
        <div className={styles.text}>
          {/* <FormatMessage msgCode='popular.more' /> */}
          更多
        </div>
        <div className={styles.arrow} />
      </div>
    </div>
  )
})

UnitMore.displayName = 'UnitMore'

type Props = {
  sid: Sid,
  iid: number,
  apiData: DataObj
}

const UnitCard = ({ sid, iid, apiData }: Props) => {
  return (
    <CardContextProvider sid={sid} iid={iid} apiData={apiData} >
      <div className={styles.box} >
        <Header />
        <Content />
        <Market />
      </div>
    </CardContextProvider>
  )
}

UnitCard.More = UnitMore
export default UnitCard
