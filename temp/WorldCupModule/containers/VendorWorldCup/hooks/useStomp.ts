import { useEffect, useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CATEGORIES, SID } from '@sport/constants/common'
import types from '@sport/constants/actionTypes'
import { TIMEZONE_EST, getDate } from '@sport/utils'
import SportsApi from '@sport/api/SportsApi'
import { setWapCollapeSwitch } from '@sport/actions/sportsAction'

import { worldCupTid } from '@sport/components/WorldCupModule/constants'
import { parseApiData } from '@sport/components/WorldCupModule/utils'

const STATUS_CANCEL = 1
const STATUS_DELAY = 2
const STATUS_START = 3
const STATUS_END = 4
const STATUS_PREMATCH = 5
const STATUS_ABNORMAL = 6
const STATUS_STOP = 7
const INPLAY_REMOVE_LIST = [STATUS_CANCEL, STATUS_DELAY, STATUS_END, STATUS_ABNORMAL, STATUS_STOP]

export const useGetDefaultWorldCup = ({
  category,
  interval,
  setData,
  isDetail = false,
  group,
  roundGroup
}: {
  category: string
  interval: string
  setData: any
  isDetail: boolean
  group: string[]
  roundGroup?: string
}) => {
  const dispatch = useDispatch()
  const eventsList = useSelector<any, { sid: number; tid: number; iid: number; status: number }[]>(state => state.sports.eventsList)
  const language = useSelector<any>(state => state.common.language)
  const inplay = category === CATEGORIES.INPLAY || (category === CATEGORIES.PARLAY && interval === CATEGORIES.INPLAY)
  const isIncoming = category === CATEGORIES.INCOMING
  const date = inplay ? false : isIncoming && !isDetail ? CATEGORIES.INCOMING : interval
  const [loading, setLoading] = useState(false)
  const errorHandler = useCallback(
    e => {
      if (e.code === 0) return false
      else {
        dispatch({
          type: types.SET_ERROR_STATUS,
          payload: e
        })
        return true
      }
    },
    [dispatch]
  )

  const getLeagueInfo = useCallback(async () => {
    if ([CATEGORIES.HOME, CATEGORIES.FAVORITE].includes(category)) {
      setLoading(false)
      return
    }

    const useDate = category === CATEGORIES.TODAY ? getDate(0, TIMEZONE_EST).format('YYYYMMDD') : date
    const worldParams = {
      sid: SID.FOOTBALL,
      tid: worldCupTid,
      inplay,
      ...((!isDetail && useDate && { date: useDate }) ?? {}),
      ...((!isDetail && group && { group }) ?? {}),
      ...(isDetail && !inplay && roundGroup && { group: roundGroup })
    }
    const worldRes = await new SportsApi().getSpecialTournament(worldParams)
    setLoading(false)
    if (errorHandler(worldRes)) return
    const rebindData = worldRes.data?.groups?.map((data: any) => parseApiData(data))
    typeof setData === 'function' && setData(rebindData)
  }, [category, date, errorHandler, inplay, setData, group, isDetail, roundGroup])

  useEffect(() => {
    setLoading(true)
    getLeagueInfo().then(() => dispatch(setWapCollapeSwitch(true))) // 收合按鈕預設開啟
  }, [dispatch, getLeagueInfo, language])

  const sendInplaySimple = useCallback(() => {
    if (document.visibilityState === 'visible' && inplay) {
      getLeagueInfo()
    }
  }, [inplay, getLeagueInfo])

  useEffect(() => {
    if (!inplay) return
    const isReFetch = eventsList?.some(({ sid, tid, status }) => {
      if (sid === SID.FOOTBALL && tid === worldCupTid) {
        return status === STATUS_START || INPLAY_REMOVE_LIST.some(el => el === status)
      }
      return false
    })
    isReFetch && sendInplaySimple()
  }, [sendInplaySimple, inplay, eventsList])

  useEffect(() => {
    if (document) document.addEventListener('visibilitychange', sendInplaySimple)
    else if (window) window.addEventListener('visibilitychange', sendInplaySimple)

    return () => {
      if (document) document.removeEventListener('visibilitychange', sendInplaySimple)
      else if (window) window.removeEventListener('visibilitychange', sendInplaySimple)
    }
  }, [sendInplaySimple])

  return { loading }
}
