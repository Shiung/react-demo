import { useMemo } from 'react'
import OddsResult from '../OddsResult'
import { ContentProps } from './types'
import cx from 'classnames'
import styles from './Content.module.scss'
// import FormatMessage from '@/components/FormatMessage'

const i18nTransform = (code: string) => {
  switch (code) {
    case 'h': return 'home' // FormatMessage({ msgCode: 'sport.common.home' })
    case 'a': return 'away' // FormatMessage({ msgCode: 'sport.common.away' })
    case 'd': return 'draw' // FormatMessage({ msgCode: 'sport.common.draw' })
    default: return ''
  }
}

/**
 *
 * 主/和 客/和 主/客
 *
 */
const ColThree30: React.FC<ContentProps> = ({ parseResultData }) => {
  const groupResult = useMemo(() => {
    return {
      first: parseResultData.filter(res => res.betOn === 'h-d'),
      middle: parseResultData.filter(res => res.betOn === 'a-d'),
      last: parseResultData.filter(res => res.betOn === 'h-a')
    }
  }, [parseResultData])

  return (
    <div className={styles.container}>
      <div className={cx(styles.group, styles.col_3)}>
        <div className={styles.column_direct}>
          {groupResult.first.map(data => {
            const [firstI18nKey, lastI18nKey] = data.betOn.split('-')
            const title = `${i18nTransform(firstI18nKey)} / ${i18nTransform(lastI18nKey)}`
            return <OddsResult key={data.betOn} result={data.result} title={title} />
          })}
        </div>
        <div className={styles.column_direct}>
          {groupResult.middle.map(data => {
            const [firstI18nKey, lastI18nKey] = data.betOn.split('-')
            const title = `${i18nTransform(firstI18nKey)} / ${i18nTransform(lastI18nKey)}`
            return <OddsResult key={data.betOn} result={data.result} title={title} />
          })}
        </div>
        <div className={styles.column_direct}>
          {groupResult.last.map(data => {
            const [firstI18nKey, lastI18nKey] = data.betOn.split('-')
            const title = `${i18nTransform(firstI18nKey)} / ${i18nTransform(lastI18nKey)}`
            return <OddsResult key={data.betOn} result={data.result} title={title} />
          })}
        </div>
      </div>
    </div>
  )
}

export default ColThree30
