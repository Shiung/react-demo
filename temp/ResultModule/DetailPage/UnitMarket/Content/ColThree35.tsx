import { useMemo } from 'react'
import OddsResult from '../OddsResult'
import { ContentProps } from './types'
import cx from 'classnames'
import styles from './Content.module.scss'

const parseTitle = (title: string, k: string) => {
  let returnStr = title
  returnStr = returnStr.replace(/%k%/g, k)
  returnStr = returnStr.replace(/[%home%, %away%, 和局, -]/g, '').trim()
  return returnStr
}

/**
 * h&ov d&ov a&ov
 * h&ud d&ud a&ud
 * .. .. ..
 */
const ColThree35: React.FC<ContentProps> = ({ parseResultData }) => {
  const groupResult = useMemo(() => {
    return {
      h: parseResultData.filter(data => data.betOn.split('&')[0] === 'h'),
      d: parseResultData.filter(data => data.betOn.split('&')[0] === 'd'),
      a: parseResultData.filter(data => data.betOn.split('&')[0] === 'a'),
    }
  }, [parseResultData])

  return (
    <div className={styles.container}>
      <div className={cx(styles.group, styles.col_3)}>
        <div className={styles.column_direct}>
          {groupResult.h.map((data) => {
            const title = parseTitle(data.settingBetOn.display, data.k)
            return <OddsResult key={`${data.betOn}-${data.k}`} result={data.result} title={title} />
          })}
        </div>
        <div className={styles.column_direct}>
          {groupResult.d.map((data) => {
            const title = parseTitle(data.settingBetOn.display, data.k)
            return <OddsResult key={`${data.betOn}-${data.k}`} result={data.result} title={title} />
          })}
        </div>
        <div className={styles.column_direct}>
          {groupResult.a.map((data) => {
            const title = parseTitle(data.settingBetOn.display, data.k)
            return <OddsResult key={`${data.betOn}-${data.k}`} result={data.result} title={title} />
          })}
        </div>
      </div>
    </div>
  )
}

export default ColThree35
