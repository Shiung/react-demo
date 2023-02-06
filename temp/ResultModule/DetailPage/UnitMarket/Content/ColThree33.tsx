import { useMemo } from 'react'
import OddsResult from '../OddsResult'
import { ContentProps } from './types'
import { ParseMarketResultObjList } from '../../../types'
import cx from 'classnames'
import styles from './Content.module.scss'

import FormatMessage from '@/components/FormatMessage'

const i18nTransform = (code: string) => {
  switch (code) {
    case 'h': return FormatMessage({ msgCode: 'sport.common.home' })
    case 'a': return FormatMessage({ msgCode: 'sport.common.away' })
    case 'd': return FormatMessage({ msgCode: 'sport.common.draw' })
    default: return ''
  }
}

const marketFilter = (parseResultData: ParseMarketResultObjList, key: string) => {
  return parseResultData.find(res => res.betOn === key)
}

/**
 * 主/主 和/和 客/客
 * 和/主 主/和 和/客
 * 客/主 客/和 主/客
 */
const ColThree33: React.FC<ContentProps> = ({ parseResultData }) => {
  const groupResult = useMemo(() => {
    return {
      h: ['h-h', 'd-h', 'a-h'].map(keyCode => marketFilter(parseResultData, keyCode)),
      d: ['d-d', 'h-d', 'a-d'].map(keyCode => marketFilter(parseResultData, keyCode)),
      a: ['a-a', 'd-a', 'h-a'].map(keyCode => marketFilter(parseResultData, keyCode)),
    }
  }, [parseResultData])

  return (
    <div className={styles.container}>
      <div className={cx(styles.group, styles.col_3)}>
        <div className={styles.column_direct}>
          {groupResult.h.map((data) => {
            if (!data) return null
            const [firstI18nKey, lastI18nKey] = data.betOn.split('-')
            const title = `${i18nTransform(firstI18nKey)} / ${i18nTransform(lastI18nKey)}`
            return <OddsResult key={data.betOn} result={data.result} title={title} />
          })}
        </div>
        <div className={styles.column_direct}>
          {groupResult.d.map((data) => {
            if (!data) return null
            const [firstI18nKey, lastI18nKey] = data.betOn.split('-')
            const title = `${i18nTransform(firstI18nKey)} / ${i18nTransform(lastI18nKey)}`
            return <OddsResult key={data.betOn} result={data.result} title={title} />
          })}
        </div>
        <div className={styles.column_direct}>
          {groupResult.a.map((data) => {
            if (!data) return null
            const [firstI18nKey, lastI18nKey] = data.betOn.split('-')
            const title = `${i18nTransform(firstI18nKey)} / ${i18nTransform(lastI18nKey)}`
            return <OddsResult key={data.betOn} result={data.result} title={title} />
          })}
        </div>
      </div>
    </div>
  )
}

export default ColThree33
