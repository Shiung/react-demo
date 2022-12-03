import React, { useState, useEffect, createContext, useContext, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { Sid, worldCupTid } from '@sport/components/WorldCupModule/constants'
import types from '@sport/constants/actionTypes'

import SportsApi from '@sport/api/SportsApi'

type DateListContextStore = {
  dates: string[]
  loading: boolean
}

const DateListContext = createContext<DateListContextStore>({
  dates: [],
  loading: true
})

const DateListContextProvider: React.FC = ({ children }) => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState<boolean>(true)
  const [dates, setDates] = useState<string[]>([])

  const fetchData = useCallback(async () => {
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

    setLoading(true)
    const res = await new SportsApi().getWorldCupDateList({
      sid: Sid.football,
      tid: worldCupTid
    })
    if (!errorHandler(res)) {
      const list = res?.data?.dateList ?? []
      setDates(list)
      dispatch({ type: types.SET_DATE_LIST, payload: list })
    }
    setLoading(false)
  }, [dispatch])

  useEffect(() => {
    // reset
    setDates([])
    dispatch({ type: types.SET_DATE_LIST, payload: [] })
    // fetch
    fetchData()
  }, [fetchData, dispatch])

  const contextVal = {
    dates,
    loading
  }

  return <DateListContext.Provider value={contextVal}>{children}</DateListContext.Provider>
}
/**
 * Consumer - 聯賽相關
 * @returns { dates: { state, dispatch } }
 */
export const useDateListContext = () => {
  return useContext(DateListContext)
}

export default DateListContextProvider
