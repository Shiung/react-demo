import { useMemo, memo } from 'react'
import cx from 'classnames'
import Header from '../Header'
import Content from '../Content'
import Market from '../Market'
import { Sid } from '../../../constants'
import type { DataObj } from '../../../types'
import CardContextProvider from '../../store/cardContext'
// import { getConfig } from '@/config'
// import FormatMessage from '@/components/FormatMessage'
import styles from './UnitCard.module.scss'

const UnitMore = memo(() => {
  const style = useMemo(() => ({
    backgroundImage: `url(${require('./img/popular.png')})` //`url(${getConfig().FE_CDN_URL}/frontend/fe-images/popular/popular.png)`,
  }), [])

  return (
    <div className={cx(styles.box, styles.more)} style={style}>
      <div className={styles.container}>
        <div className={styles.text}>
          {/* <FormatMessage msgCode='popular.more' /> */}
          更多
        </div>
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
