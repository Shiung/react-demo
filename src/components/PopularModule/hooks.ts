import { useState, useMemo, useEffect, useCallback } from 'react'
// import { SUBSCIBE_POPULAR_MATCH } from '@/stompWs'
// import { useSelector } from 'react-redux'
import type { PopularList } from './types'
// import SportsApi from '@/api/SportsApi'
import API from '@/api'

const emptyLs: PopularList = []

const empty = { connected: false }

const usePopularList = () => {
  const stompClient = empty // useSelector((store: any) => store?.sports?.stompClient)
  const language = 'zh_CN' //useSelector((state: any) => state.common.language)
  const timezone = 'GMT+0800' //useSelector((state: any ) => state.common.timezone)
  const [popularLs, setPopularLs] = useState<{ sid: number, iid: number}[]>([])
  const [list, setList] = useState<PopularList>(emptyLs)

  const fetchData = useCallback(async () => {
    if (popularLs.length === 0 || !timezone || !language) return setList(emptyLs)
    // const res = await new SportsApi().getPopularMatch(popularLs)
    
    // if (res.code === 0) {
    //   const resData = res.data
    //   const serverTime = res.time
    //   const updateLs = popularLs.reduce<PopularList>((prev, cur) => {
    //     const searchIID = cur.iid
    //     let findObj
    //     for (let m of resData) {
    //       const find = m?.matches?.find((i: any) => i.iid === searchIID)
    //       if (find) {
    //         find.serverTime = serverTime
    //         findObj = find
    //         break
    //       }
    //     }
    //     return findObj
    //       ? prev.concat(findObj)
    //       : prev
    //   }, [])

    //   updateLs.length > 8 && (updateLs.length = 8)
    //   setList(updateLs)
    // }

    const res = await API.getPopularInfo()
    const resData = res
    const serverTime = 1678265364520 // res.time
    const updateLs = popularLs.reduce<PopularList>((prev, cur) => {
      const searchIID = cur.iid
      let findObj
      for (let m of resData) {
        const find = m?.matches?.find((i: any) => i.iid === searchIID)
        if (find) {
          find.serverTime = serverTime
          findObj = find
          break
        }
      }
      return findObj
        ? prev.concat(findObj)
        : prev
    }, [])

    updateLs.length > 8 && (updateLs.length = 8)
    setList(updateLs)

  }, [popularLs, language, timezone])

  useEffect(() => {
    // if (!stompClient.connected) return
    // const popularEvent = stompClient.subscribe(SUBSCIBE_POPULAR_MATCH, (msg: any) => {
    //   const ls = JSON.parse(msg.body)
    //   setPopularLs(ls)
    // })

    // return () => {
    //   popularEvent?.unsubscribe()
    // }

    if (stompClient.connected) return
    setTimeout(() => {
      setPopularLs([
        { sid: 1, iid: 9300992 },
        { sid: 1, iid: 9300993 },
        { sid: 1, iid: 9302139 },
        { sid: 1, iid: 9292962 },
        { sid: 2, iid: 9300921 },
        { sid: 2, iid: 9300920 },
        { sid: 2, iid: 9300991 },
        { sid: 3, iid: 9313004 }
      ])
    }, 1000)
  }, [stompClient])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return {
    language,
    timezone,
    list,
    hasList: useMemo(() => list.length !== 0, [list])
  }
}

export {
  usePopularList
}
