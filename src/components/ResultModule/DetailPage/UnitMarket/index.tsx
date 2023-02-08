import React, { useState, useMemo, useCallback } from 'react'
import { BallType } from '../../types'
import { Sid } from '../../constants'
import cx from 'classnames'
import styles from './UnitMarket.module.scss'
import { useUnitMarketData } from '../../store/hooks'
// import { ArrowUp } from '@icons/index'
import { ReactComponent as ArrowUp } from '@/assets/svg/arrow-up.svg'
import PlaceHolder  from '../../PlaceHolder'
import * as MarketConfig from './constants'

type Props = {
  market: string,
  iid: string,
  ballType: BallType,
  homeName: string,
  awayName: string
}

const UnitMarket: React.FC<Props> = ({ market, iid, ballType, homeName, awayName }) => {
  const [open, setOpen] = useState<boolean>(false)
  const { isReady, parseResultData, marketName, layout } = useUnitMarketData({ open, ballType, iid, market, homeName, awayName })

  const colapseHandler = useCallback(() => setOpen(prev => !prev), [])

  const showScore = useMemo(() => {
    if (market.includes('ah') && Sid[ballType] === Sid.football) return '0-0'
    return
  }, [ballType, market])

  const HeaderComp = (MarketConfig.LayoutMap[layout] || MarketConfig.LayoutMap.default).HeaderComp
  const ContentComp = (MarketConfig.LayoutMap[layout] || MarketConfig.LayoutMap.default).RowComp

  return (
    <div className={styles.container}>
      <div className={styles.header} onClick={colapseHandler.bind(null)}>
        <div className={cx(styles.icon, { [styles.down]: !open })}><ArrowUp width='23px' height='23px' /></div>
        <div>{marketName} {showScore}</div>
      </div>
      <div className={cx(open ? styles.content : styles.closed)}>
        {!isReady && <PlaceHolder.Market />}

        {isReady && HeaderComp &&
          <HeaderComp homeName={homeName} awayName={awayName} isReverse={Sid[ballType] === Sid.baseball} />}
        {isReady && <ContentComp parseResultData={parseResultData} market={market} isReverse={Sid[ballType] === Sid.baseball} />}
      </div>
    </div>
  )
}

export default UnitMarket
