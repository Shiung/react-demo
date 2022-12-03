import React, { useState, useMemo, useEffect, useContext, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { history, getDate, getExtendedDates, TIMEZONE_EST } from '@sport/utils'
import ContainerBox from '@sportComponents/ContainerBox/wap'
import HeaderContent from '@sportComponents/Header/HeaderContent'
import Empty from '@sportComponents/Empty'
import Tournament from './Tournament'
import SimpleHeader from '@sportComponents/Header/SimpleHeader'
import { SelectorContext } from './store/selector-context'
import { useDateListContext } from './store/dateList-context'
import SelectOption from './SelectOption'
import SportsApi from '@sport/api/SportsApi'
import { parsePath } from './utils'
import types from '@sport/constants/actionTypes'
import BadgeIcon from '@sportPages/mobile/components/League/BadgeIcon'
import FormatMessage from '@/sports/components/FormatMessage'

import * as WorldCup from '@sport/components/WorldCupModule/components/WorldCup'
import type { LeagueLS, LeagueObj } from './type'
import { Sid, worldCupTid } from '@sport/components/WorldCupModule/constants'
import WCButton from '@sport/components/WorldCupModule/components/WCButton'

import { CATEGORIES } from '@sport/constants/common'
import { setWapCollapeSwitch } from '@sport/actions/sportsAction'

import PlaceHolder from '@sportPages/mobile/components/League/PlaceHolder'

const GameUnit: React.FC<LeagueObj & { extended: string }> = ({ type, count, extended }) => {
  const { category, interval } = useParams<{ category: string; interval?: string }>()
  const { items, addItem } = useContext(SelectorContext)

  const isActive = useMemo(() => {
    const list = new Set(items)
    return list.has(type)
  }, [items, type])

  const basePath = useMemo(
    () => parsePath({ interval: interval === 'extended' ? extended : interval, category }),
    [interval, category, extended]
  )

  return (
    <Tournament
      name={<WorldCup.RoundGroupName roundGroup={type} />}
      count={count}
      select={addItem.bind(null, type)}
      active={isActive}
      click={() => history.push(`${basePath}/${type}`)}
    />
  )
}

const League: React.FC<{ ls: LeagueLS; extended: string }> = ({ ls, extended }) => {
  const titleName = useMemo(() => FormatMessage({ msgCode: 'worldCup.FIFIA22Title' }), [])
  return (
    <HeaderContent
      key={'worldCup'}
      gameNum={ls.length}
      title={titleName}
      expand
      showBadge={true}
      badge={<BadgeIcon imgSrc={require('@sport/components/WorldCupModule/image/fifa_2022.png').default} />}
      fixInitExpand
      titleBold
    >
      {useMemo(() => {
        return ls.map(({ type, count }) => <GameUnit key={type} type={type} count={count} extended={extended} />)
      }, [ls, extended])}
    </HeaderContent>
  )
}

const emptyLeagueObjList: LeagueLS = []

const LeagueList: React.FC = () => {
  const { category, interval } = useParams<{ category: string; interval?: string }>()
  const language = useSelector((state: any) => state.common.language)
  const [list, setList] = useState<LeagueLS>(emptyLeagueObjList)
  const [loading, setLoading] = useState<boolean>(true)
  const { removeItemAll } = useContext(SelectorContext)
  const { dates } = useDateListContext()
  const dispatch = useDispatch()

  const extended = useMemo(() => {
    return interval === 'extended' ? getExtendedDates(dates).join(',') : ''
  }, [dates, interval])

  const categoryTitle = useMemo(() => {
    switch (category) {
      case CATEGORIES.PARLAY:
        if (interval === CATEGORIES.TODAY) return interval
        return CATEGORIES.EARLY
      default:
        return category
    }
  }, [category, interval])

  const hasShow = list.length > 0

  const fetchData = useCallback(async () => {
    const isToday = category === CATEGORIES.TODAY || (category === CATEGORIES.PARLAY && interval === CATEGORIES.TODAY)

    const today = getDate(0, TIMEZONE_EST).format('YYYYMMDD')
    let currentInterval = isToday ? today : interval
    currentInterval = interval === 'extended' ? getExtendedDates(dates).join(',') : currentInterval

    const params = {
      sid: Sid.football,
      tid: worldCupTid,
      ...(currentInterval && { date: currentInterval })
    }
    setLoading(true)
    const res = await new SportsApi().getWorldCupGroupList(params)
    setLoading(false)
    dispatch(setWapCollapeSwitch(true))

    const errorHandler = (e: { code: number }) => {
      if (e.code === 0) return false
      else {
        dispatch({
          type: types.SET_ERROR_STATUS,
          payload: e
        })
        return true
      }
    }

    if (errorHandler(res)) return

    setList(res.data?.groups ?? emptyLeagueObjList)
  }, [dispatch, interval, category, dates])

  useEffect(() => {
    window.scrollTo(0, 0)
    setList(emptyLeagueObjList)
    fetchData()
    return () => {
      /* 當上一次送出請求,移除上次的選擇 */
      removeItemAll()
    }
  }, [fetchData, removeItemAll, language])

  return (
    <>
      <SimpleHeader
        category={categoryTitle}
        ballType={Sid[Sid.football]}
        showOption={false}
        childComp={<SelectOption ls={list} currentCat={categoryTitle} extended={extended} />}
        wcButton={<WCButton />}
      />
      <ContainerBox>
        <div>
          {loading && <PlaceHolder />}
          {!loading && !hasShow && <Empty />}
          {!loading && hasShow && <League ls={list} extended={extended} />}
        </div>
      </ContainerBox>
    </>
  )
}

export default LeagueList
