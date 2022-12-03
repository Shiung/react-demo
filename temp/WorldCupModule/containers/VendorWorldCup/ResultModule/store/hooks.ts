import { useCallback, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import types from '@sport/constants/actionTypes'
import { useWorldCupLeagueContext, emptyLs } from './league-context'
import moment from 'moment'
import { dateTransformMethod } from '@sport/utils/dateTransform'

import { SportsApi_TZ } from '@sport/api/SportsApi'

import type { MatchObj } from '../types'
import { worldCupTid } from '@sport/components/WorldCupModule/constants'

export const useFetchResultLeagueData = ({ date }: { date: string }) => {
  const timezone = useSelector((state: any) => state.common.timezone)
  const language = useSelector((state: any) => state.common.language)
  const dispatch = useDispatch()
  const { updateLoading, updateLs } = useWorldCupLeagueContext()

  const fetchData = useCallback(async () => {
    if (!date) return []
    updateLoading(true)
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
    const { YYYYMMDD: endDate } = dateTransformMethod(moment(date).add(1, 'days')) as any

    // const params = {
    //   sid: 1,
    //   tid: worldCupTid,
    //   startDate: `2022-11-27`,
    //   endDate: `2022-11-29`
    // }
    const params = {
      sid: 1,
      tid: worldCupTid,
      startDate: date,
      endDate: endDate
    }

    const res = await new SportsApi_TZ().getWorldCupGameResult(params)

    updateLoading(false)
    if (errorHandler(res)) return

    if (res.data.matches) {
      updateLs(res.data)
    } else {
      updateLs(emptyLs)
    }    
  }, [dispatch, date, updateLoading, updateLs])

  useEffect(() => {
    fetchData()
    return () => {
      updateLs(emptyLs)
    }
  }, [fetchData, updateLs, timezone, language])
}

const emptyTourn: MatchObj[] = []

export const useTournamentMatchData = ({ group }: { group: string }) => {
  const { filterLs } = useWorldCupLeagueContext()
  const [data, setData] = useState<MatchObj[]>(emptyTourn)
  useEffect(() => {
    const matchesData = filterLs.matches ?? {}
    if (group && group in matchesData) {
      setData(matchesData[group])
    }
    return () => {
      setData(emptyTourn)
    }
  }, [filterLs, group])

  return data
}

const emptyDetailData: MatchObj = {
  awayName: '',
  homeName: '',
  awayId: NaN,
  homeId: NaN,
  kickOff: NaN,
  scoresInfo: {},
  cancelReason: '',
  iid: NaN
}

export const useDetailMatchData = ({ group, iid }: { group: string, iid: number }) => {
  const { filterLs } = useWorldCupLeagueContext()
  const [data, setData] = useState<MatchObj>(emptyDetailData)

  useEffect(() => {
    const matchesData = filterLs.matches ?? {}
    if (group in matchesData && iid) {
      const matchDetail = matchesData[group]?.find((t) => t.iid === iid)
      if (matchDetail) {
        setData(matchDetail)
      }
    }
    return () => {
      setData(emptyDetailData)
    }
  }, [filterLs, group, iid])

  return {
    data
  }
}
