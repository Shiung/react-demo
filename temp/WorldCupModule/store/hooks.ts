import { useRef, useState, useCallback, useMemo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import types from '@sport/constants/actionTypes'
import type { GameInfoLs, GroupDataLs } from '@sport/components/WorldCupModule/types'
import { Sid, RoundConf, worldCupTid } from '@sport/components/WorldCupModule/constants'

import SportsApi from '@sport/api/SportsApi'

// const STATUS_CANCEL = 1 
// const STATUS_DELAY = 2
// const STATUS_START = 3
// const STATUS_END = 4
// const STATUS_PREMATCH = 5
// const STATUS_ABNORMAL = 6
// const STATUS_STOP = 7

// enum EvenSTATUS {
//   /** 賽事取消 */
//   CANCEL = 1,
//   /** 賽事延期 */
//   DELAY = 2,
//   /** 賽事開賽 */
//   START = 3,
//   /** 賽事結束 */
//   END = 4,
//   /** 賽事(早盤)關閉 */
//   PREMATCH = 5,
//   /** 賽事異常 */
//   ABNORMAL = 6,
//   /** 賽事中止 */
//   STOP = 7
// }
// const INPLAY_REMOVE_LIST = [EvenSTATUS.CANCEL, EvenSTATUS.DELAY, EvenSTATUS.END, EvenSTATUS.ABNORMAL, EvenSTATUS.STOP]
// const PREMATCH_REMOVE_LIST = [EvenSTATUS.DELAY, EvenSTATUS.PREMATCH, EvenSTATUS.ABNORMAL, EvenSTATUS.STOP]

let timer: ReturnType<typeof setTimeout>
const debounce = function (func: () => void) {
  return function () {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(null)
    }, 3000)
  }
}

const _groupByMethod = (data: GameInfoLs, group: RoundConf) => {
  return data.filter(({ roundGroup }) => roundGroup === group)
}

const useFetchWorldCupData = ({ fetchType, fetchRound }: {
  fetchType?: number,
  fetchRound?: number  
}) => {
  const eventsList = useSelector((state: any) => state?.sports?.eventsList)
  const [data, setData] = useState<GameInfoLs>([])
  const dispatch = useDispatch()
  const isDestory = useRef<boolean>(false)

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

    const params = {
      type: fetchType,
      ...(fetchRound && { round: fetchRound })
    }
    const res = await new SportsApi().getWorldCupGame(params)
    if (errorHandler(res) || isDestory.current) return
    setData(res?.data?.match ?? [])
  }, [dispatch, fetchType, fetchRound])

  useEffect(() => {
    isDestory.current = false
    fetchData()
    return () => {
      isDestory.current = true
    }
  }, [fetchData])

  useEffect(() => {
    const isRefetch = eventsList.some((even: { sid: Sid, tid: number }) => {
      return even.sid === Sid.football && even.tid === worldCupTid
    })

    if (isRefetch) debounce(fetchData)()
  }, [fetchData, eventsList])

  return {
    data
  }
}

const useGroupData = (data: GameInfoLs): GroupDataLs  => {
  return useMemo(() => {
    let returnArr: GroupDataLs = []

    const groupAdata = _groupByMethod(data, RoundConf.A)
    const groupBdata = _groupByMethod(data, RoundConf.B)
    const groupCdata = _groupByMethod(data, RoundConf.C)
    const groupDdata = _groupByMethod(data, RoundConf.D)
    const groupEdata = _groupByMethod(data, RoundConf.E)
    const groupFdata = _groupByMethod(data, RoundConf.F)
    const groupGdata = _groupByMethod(data, RoundConf.G)
    const groupHdata = _groupByMethod(data, RoundConf.H)

    if (groupAdata.length > 0) returnArr.push({ group: RoundConf.A, matches: groupAdata })
    if (groupBdata.length > 0) returnArr.push({ group: RoundConf.B, matches: groupBdata })
    if (groupCdata.length > 0) returnArr.push({ group: RoundConf.C, matches: groupCdata })
    if (groupDdata.length > 0) returnArr.push({ group: RoundConf.D, matches: groupDdata })
    if (groupEdata.length > 0) returnArr.push({ group: RoundConf.E, matches: groupEdata })
    if (groupFdata.length > 0) returnArr.push({ group: RoundConf.F, matches: groupFdata })
    if (groupGdata.length > 0) returnArr.push({ group: RoundConf.G, matches: groupGdata })
    if (groupHdata.length > 0) returnArr.push({ group: RoundConf.H, matches: groupHdata })

    return returnArr
  }, [data])
}

export {
  useFetchWorldCupData,
  useGroupData
}