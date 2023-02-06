import { useMemo } from 'react'
import OddsResult from '../OddsResult'
import { ContentProps } from './types'
import cx from 'classnames'
import styles from './Content.module.scss'
import FormatMessage from '@/components/FormatMessage'

/**
 *
 * 主 和 客
 *
 */
const ColThree: React.FC<ContentProps> = ({ parseResultData, isReverse }) => {
  const groupResult = useMemo(() => {
    return {
      h: parseResultData.filter(res => res.betOn === 'h'),
      d: parseResultData.filter(res => res.betOn === 'd'),
      a: parseResultData.filter(res => res.betOn === 'a')
    }
  }, [parseResultData])

  return (
    <div className={styles.container}>
      <div className={cx(styles.group, styles.col_3)}>
        <div className={styles.column_direct}>
          {groupResult[!isReverse ? 'h' : 'a'].map(data => {
            const i18nKey = data.betOn === 'h' ? 'home' : 'away'
            const title = FormatMessage({ msgCode: `sport.common.${i18nKey}` })
            return <OddsResult key={data.betOn} result={data.result} title={title} />
          })}
        </div>
        <div className={styles.column_direct}>
          {groupResult.d.map(data => {
            const title = FormatMessage({ msgCode: 'sport.common.draw' })
            return <OddsResult key={data.betOn} result={data.result} title={title} />
          })}
        </div>
        <div className={styles.column_direct}>
          {groupResult[!isReverse ? 'a' : 'h'].map(data => {
            const i18nKey = data.betOn === 'h' ? 'home' : 'away'
            const title = FormatMessage({ msgCode: `sport.common.${i18nKey}` })
            return <OddsResult key={data.betOn} result={data.result} title={title} />
          })}
        </div>
      </div>
    </div>
  )
}

export default ColThree
