import React, { useState, useCallback, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styles from './TopHeader.module.scss'
import { history } from '@/utils'
import { ArrowLeft, HeaderSearchDark } from '@icons/index'
import { BallType, MathType } from '../types'
import Selector from './Selector'
import BallMenu from './BallMenu'
import SearchBar from './SearchBar'
import { useLeagueContext } from '../store/league-context'

type Props = {
  title: string | React.ReactNode,
  hasSearch?: boolean,
  disableOption?: boolean,
  children?: React.ReactNode,
  onGoback?: () => void
}

const TopHeader = React.forwardRef<HTMLDivElement, Props>((
  { title, hasSearch = false, disableOption = false, onGoback, children },
  ref
) => {
  const [search, setSearch] = useState<boolean>(hasSearch ?? false)
  const { ballType, match, date } = useParams<{ ballType: BallType, match: MathType, date: string }>()
  const { updateSearch } = useLeagueContext()

  const goBackHandler = useCallback(() => {
    // 搜尋狀態關閉 不做路由切換
    if (search) {
      setSearch(false)
      updateSearch('')
      return
    }
    onGoback ? onGoback() : history.goBack()
  }, [onGoback, updateSearch, search])

  const searchHandler = useCallback(() => {
    setSearch(prev => !prev)
  }, [])

  useEffect(() => {
    return () => {
      setSearch(false)
    }
  }, [ballType, match, date])

  return (
    <div className={styles.container} ref={ref}>
      <div className={styles.top}>
        <div onClick={goBackHandler} ><ArrowLeft width='20px' height='20px'/></div>
        <div className={styles.title}>{title}</div>
        {!disableOption && !search ? <div onClick={searchHandler} ><HeaderSearchDark width='20px' height='20px' /></div> : <div />}
      </div>
      {!disableOption && <Selector />}
      {!disableOption && <BallMenu />}
      {!disableOption && search && <SearchBar clickCallback={searchHandler} />}
      {React.isValidElement(children) && children}
    </div>
  )
})

TopHeader.displayName = 'TopHeader'

export default TopHeader
