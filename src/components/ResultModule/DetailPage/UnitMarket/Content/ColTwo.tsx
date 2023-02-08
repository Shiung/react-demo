import { useMemo } from 'react'
import OddsResult from '../OddsResult'
import { ContentProps } from './types'
import { ParseMarketResultObjList } from '../../../types'
// import FormatMessage from '@/components/FormatMessage'
import cx from 'classnames'
import styles from './Content.module.scss'

type Map = {
  key: string,
  displaySort?: string[],
  useBetOn?: boolean,
  titleHandler?: (k: string, title: string, betOn?: string) => string
}

const groupMap = (market: string, isReverse: boolean = false) => {
  if (market.includes('ml')) return {
    key: 'idx',
    displaySort: !isReverse ? ['h', 'a'] : ['a', 'h'],
    titleHandler: (betOn: string, title: string) => {
      return betOn === 'h'
        ? 'home' // FormatMessage({ msgCode: 'sport.common.home' })
        : 'away' // FormatMessage({ msgCode: 'sport.common.away' })
    },
    useBetOn: true
  }

  if (market.includes('ah')) return {
    key: 'k',
    displaySort: !isReverse ? ['h', 'a'] : ['a', 'h'],
    titleHandler: (k: string, title: string) => k
  }

  if (market.includes('ou')) return {
    key: 'k',
    displaySort: ['ov', 'ud'],
    titleHandler: (k: string, title: string) => `${title} ${k}`
  }

  return {
    key: 'idx',
    displaySort: undefined,
    titleHandler: undefined
  }
}

const groupByIdxHandler = (parseResultData: ParseMarketResultObjList, groupConf: Map) => {
  const { displaySort, useBetOn, titleHandler } = groupConf
  return parseResultData.reduce((returnArr, current, idx) => {
    const newIdx = idx / 2

    const titleMapKey = useBetOn ? current.betOn : current.k
    const rebindCurrent = {
      ...current,
      ...(titleHandler && { title: titleHandler(titleMapKey, current.title) })
    }

    if (idx % 2 === 0) {
      return returnArr.concat([{
        id: newIdx,
        list: [rebindCurrent]
      }])
    } else {
      const lastIdx = Math.floor(newIdx)
      const replaceArr = [...returnArr[lastIdx].list].concat([rebindCurrent])
      displaySort && replaceArr.sort((a, b) => b.betOn === displaySort[0] ? 1 : -1)
      returnArr[lastIdx].list = replaceArr
      return returnArr
    }
  }, [] as Array<{ id: string | number, list: ParseMarketResultObjList }>)
}

const groupByKHandler = (parseResultData: ParseMarketResultObjList, groupConf: Map) => {
  const { displaySort, titleHandler } = groupConf
  return parseResultData.reduce((returnArr, current, idx) => {
    const key = current.k.replace(/[-+]/g, '')
    const newIdx = idx / 2

    const rebindCurrent = {
      ...current,
      ...(titleHandler && { title: titleHandler(current.k, current.title) })
    }
    if (idx % 2 === 0) {
      return returnArr.concat([{
        id: `${key}-${newIdx}`,
        list: [rebindCurrent]
      }])
    } else {
      const lastIdx = Math.floor(newIdx)
      const replaceArr = [...returnArr[lastIdx].list].concat([rebindCurrent])
      displaySort && replaceArr.sort((a, b) => b.betOn === displaySort[0] ? 1 : -1)
      returnArr[lastIdx].list = replaceArr
      return returnArr
    }
  }, [] as Array<{ id: string | number, list: ParseMarketResultObjList }>)
}

const ColTwo: React.FC<ContentProps> = ({ parseResultData, market, isReverse }) => {
  const groupResult = useMemo(() => {
    const groupConf= groupMap(market, isReverse)
    if (groupConf.key === 'k') return groupByKHandler(parseResultData, groupConf)
    return groupByIdxHandler(parseResultData, groupConf)
  }, [parseResultData, market, isReverse])

  return (
    <div className={styles.container}>
      {groupResult.map(({ id, list }) => {
        return (
          <div key={id} className={cx(styles.group, styles.col_2)}>
            {list.map(({ result, title, k }, idx) => {
              return <OddsResult key={`${id}-${idx}`} result={result} title={title} />
            })}
          </div>
        )
      })}
    </div>
  )
}

export default ColTwo
