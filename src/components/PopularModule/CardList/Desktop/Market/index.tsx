import cx from 'classnames'
import styles from './Market.module.scss'
// import OddsBtn from '@/components/OddsBtn'
import { useMarketMapping } from '../../hooks/useMarket'

const Market = () => {
  const { length, oddsBtnList } = useMarketMapping()
  return (
    <div className={cx(styles.market, length === 3 ? styles.col3 : styles.col2)} >
      {oddsBtnList.map(({ key, odds, oddsInfo, title }) => {
        // return <OddsBtn
        //   className={styles.oddsBtn}
        //   key={key}
        //   title={title}
        //   odds={odds}
        //   oddsInfo={oddsInfo}
        //   callback={() => {}}
        //   useIcon
        // />
        return <div>投注</div>
      })}
    </div>
  )
}

export default Market
