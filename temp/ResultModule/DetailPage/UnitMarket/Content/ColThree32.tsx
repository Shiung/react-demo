import { useMemo } from 'react'
import OddsResult from '../OddsResult'
import { ContentProps } from './types'
import { ParseMarketResultObj } from '../../../types'
import cx from 'classnames'
import styles from './Content.module.scss'

import FormatMessage from '@/components/FormatMessage'

enum CompairType {
  /**
   * 主 > 客
   */
  over = 1,

  /**
   * 主 ＝ 客
   */
  equal = 2,

  /**
   * 主 < 客
   */
  lower = 3
}

const sortRule = (a: ParseMarketResultObj, b: ParseMarketResultObj) => {
  if (b.betOn.includes('other')) {
    const aNum = parseInt(a.betOn.replace(/other/g, ''))
    const bNum = parseInt(b.betOn.replace(/other/g, ''))
    return aNum - bNum
  }

  const [aFirst, aLast] = a.betOn.split('-')
  const [bFirst, bLast] = b.betOn.split('-')
  const aFirstNum = parseInt(aFirst)
  const aLastNum = parseInt(aLast)
  const bFirstNum = parseInt(bFirst)
  const bLastNum = parseInt(bLast)

  if (aFirstNum === bFirstNum) return aLastNum - bLastNum
  return aFirstNum - bFirstNum
}

/**
 * cs only
 * home>away home=away home<away
 */
const ColThree32: React.FC<ContentProps> = ({ parseResultData }) => {
  const groupResult = useMemo(() => {
    const compareKey = (betOn: string, type: CompairType) => {
      const [homeKey, awaykey] = betOn.split('-')
      switch (type) {
        case CompairType.over: return homeKey > awaykey
        case CompairType.equal: return homeKey === awaykey
        case CompairType.lower: return homeKey < awaykey
        default: return false
      }
    }
    return {
      h: parseResultData.filter(data => compareKey(data.betOn, CompairType.over)).sort(sortRule),
      d: parseResultData.filter(data => compareKey(data.betOn, CompairType.equal)).sort(sortRule),
      a: parseResultData.filter(data => compareKey(data.betOn, CompairType.lower)).sort(sortRule),
      other: parseResultData.filter(data => data.betOn.includes('other')).sort(sortRule)
    }
  }, [parseResultData])

  return (
    <div className={styles.container}>
      <div className={cx(styles.group, styles.col_3)}>
        <div className={styles.column_direct}>
          {groupResult.h.map((data) => <OddsResult key={data.betOn} result={data.result} title={data.betOn} />)}
        </div>
        <div className={styles.column_direct}>
          {groupResult.d.map((data) => <OddsResult key={data.betOn} result={data.result} title={data.betOn} />)}
        </div>
        <div className={styles.column_direct}>
          {groupResult.a.map((data) => <OddsResult key={data.betOn} result={data.result} title={data.betOn} />)}
        </div>
      </div>
      {groupResult.other.map((data) => {
        const title = FormatMessage({ msgCode: 'sport.common.other' })
        return <OddsResult key={data.betOn} result={data.result} title={title} />
      })}
    </div>
  )
}

export default ColThree32
