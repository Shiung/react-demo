import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import {
  StampDrawCn,
  StampDrawEn,
  StampLoseCn,
  StampLoseEn,
  StampLoseHalfCn,
  StampLoseHalfEn,
  StampLoseHalfHk,
  StampLoseHk,
  StampRefundCn,
  StampRefundEn,
  StampWinCn,
  StampWinEn,
  StampWinHalfCn,
  StampWinHalfEn,
  StampWinHalfHk,
  StampWinHk,
} from '@pages/mobile/Result/icons'
import { LANGUAGE } from '@/constants/common'
import styles from './OddsResult.module.scss'
import cx from 'classnames'
import { ResultType } from '../../../constants'

type Props = {
  result: ResultType,
  title: string
}

const OddsResult: React.FC<Props> = ({ result, title }) => {
  const lang = useSelector((state: any) => state.common.language)

  const StampComp = useMemo(() => {
    switch (result) {
      case ResultType.WINNER:
        if (lang === LANGUAGE.zh_cn) return <StampWinCn width='35px' height='35px'/>
        if (lang === LANGUAGE.zh_hk) return <StampWinHk width='35px' height='35px'/>
        return <StampWinEn width='35px' height='35px'/>
      case ResultType.WIN_HALF:
        if (lang === LANGUAGE.zh_cn) return <StampWinHalfCn width='35px' height='35px'/>
        if (lang === LANGUAGE.zh_hk) return <StampWinHalfHk width='35px' height='35px'/>
        return <StampWinHalfEn width='35px' height='35px'/>
      case ResultType.LOSER:
        if (lang === LANGUAGE.zh_cn) return <StampLoseCn width='35px' height='35px'/>
        if (lang === LANGUAGE.zh_hk) return <StampLoseHk width='35px' height='35px'/>
        return <StampLoseEn width='35px' height='35px'/>
      case ResultType.LOSE_HALF:
        if (lang === LANGUAGE.zh_cn) return <StampLoseHalfCn width='35px' height='35px'/>
        if (lang === LANGUAGE.zh_hk) return <StampLoseHalfHk width='35px' height='35px'/>
        return <StampLoseHalfEn width='35px' height='35px'/>
      case ResultType.DRAW:
        if (lang === LANGUAGE.zh_cn) return <StampDrawCn width='35px' height='35px'/>
        if (lang === LANGUAGE.zh_hk) return <StampDrawCn width='35px' height='35px'/>
        return <StampDrawEn width='35px' height='35px'/>
      case ResultType.REFUND:
        if (lang === LANGUAGE.zh_cn) return <StampRefundCn width='35px' height='35px'/>
        if (lang === LANGUAGE.zh_hk) return <StampRefundCn width='35px' height='35px'/>
        return <StampRefundEn width='35px' height='35px'/>
      default: return null
    }
  }, [lang, result])

  return (
    <div className={cx(styles.box)}>
      <div className={styles.beton}>{title}</div>
      <div className={styles.icon}>{StampComp}</div>
    </div>
  )
}

export default OddsResult

//StampDrawCn } from './StampDrawCn'

