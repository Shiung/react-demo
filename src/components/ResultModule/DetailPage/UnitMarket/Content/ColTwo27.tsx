import { useMemo } from 'react'
import OddsResult from '../OddsResult'
import { ContentProps } from './types'
import { ParseMarketResultObj } from '../../../types'
import cx from 'classnames'
import styles from './Content.module.scss'

const parseTitle = (title: string) => title.replace(/[%home%, %away%, -]/g, '').trim()

const sortRule = (a: ParseMarketResultObj, b: ParseMarketResultObj) => {
  const aNum = parseInt(a.betOn.replace(/[h, d, a, +]/g, ''))
  const bNum = parseInt(b.betOn.replace(/[h, d, a, +]/g, ''))
  if (aNum === bNum) {
    return a.betOn.includes('+') ? 1 : -1
  }
  return aNum - bNum
}

const ColTwo27: React.FC<ContentProps> = ({ parseResultData, market }) => {
  const groupResult = useMemo(() => {
    const returnObj = {
      h: parseResultData.filter(data => data.betOn.includes('h')).sort(sortRule),
      d: parseResultData.filter(data => data.betOn.includes('d')).sort(sortRule),
      a: parseResultData.filter(data => data.betOn.includes('a')).sort(sortRule)
    }
    return returnObj
  }, [parseResultData])

  return (
    <div className={styles.container}>
      <div className={cx(styles.group, styles.col_2)}>
        <div className={styles.column_direct}>
          {groupResult.h.map(({ title, result, betOn, settingBetOn }, idx) => {
            const reTitle = parseTitle(settingBetOn?.display ?? '')
            return <OddsResult key={`h-${betOn}-${idx}`} result={result} title={reTitle} />
          })}
        </div>
        <div className={styles.column_direct}>
          {groupResult.a.map(({ title, result, betOn, settingBetOn }, idx) => {
            const reTitle = parseTitle(settingBetOn?.display ?? '')
            return <OddsResult key={`h-${betOn}-${idx}`} result={result} title={reTitle} />
          })}
        </div>
      </div>

      {groupResult.d.map(({ title, result, betOn, settingBetOn }, idx) => {
        const reTitle = parseTitle(settingBetOn?.display ?? '')
        return <OddsResult key={`d-${betOn}-${idx}`} result={result} title={reTitle} />
      })}
    </div>
  )
}

export default ColTwo27
