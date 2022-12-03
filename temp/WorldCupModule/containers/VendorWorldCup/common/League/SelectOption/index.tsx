import React, { useEffect, useContext, useMemo } from 'react'
import ReactDOM from 'react-dom'
import { useParams } from 'react-router-dom'
import { SelectorContext } from '../store/selector-context'
import FormatMessage from '@sport/components/FormatMessage'
import type { LeagueLS } from '../type'
import { parsePath } from '../utils'
import { history } from '@sport/utils'
import styles from '@sportPages/mobile/components/League/SelectOption/SelectOption.module.scss'

import { ElementId } from '@/hooks/useStickyController'

const SelectOption = React.memo<{ ls: LeagueLS; currentCat?: string; extended: string }>(({ ls, currentCat, extended }) => {
  const { items, removeItemAll } = useContext(SelectorContext)
  const { category, interval } = useParams<{ category: string; interval?: string }>()

  const count = useMemo(() => {
    if (items.length === 0) return 0

    const selected = new Set(items)
    return ls.reduce((sum, { type, count }) => {
      return selected.has(type) ? sum + count : sum
    }, 0)
  }, [ls, items])

  const path = useMemo(() => {
    return parsePath({ category, interval: interval === 'extended' ? extended : interval })
  }, [category, interval, extended])

  useEffect(() => {
    // reset items when has (ls list but count === 0) and has select items array
    if (ls.length > 0 && items.length > 0 && count === 0) removeItemAll()
  }, [count, ls, items, removeItemAll])

  if (count < 1) return <></>

  return ReactDOM.createPortal(
    <div id={ElementId.SPORT_LEAGUE_ID} className={styles.box} onClick={() => history.push(`${path}/${items.join(',')}`)}>
      <div className={styles.content}>
        <FormatMessage msgCode={`select.${currentCat}`} />
        <span className={styles.count}>{count}</span>
      </div>
      <div className={styles.arrowRight} />
    </div>,
    document.getElementById('sports-sticky') as HTMLDivElement
  )
})

SelectOption.displayName = 'SelectOption'

export default SelectOption
