import { useEffect, useState } from 'react'
// import { useSelector } from 'react-redux'
// import {
//   SUBSCRIBE_ODDS_DIFF_URL,
//   SUBSCRIBE_INPLAY_INFO_URL,
// } from '@/stompWs'
import { Sid } from '../../constants'

type StompRespon = {
  market: any,
  removeMarket: string[],
  sendType: 'INIT' | 'UPDATE'
}
const _parseUpdateMarket = (prev: any = {}, stompRespond: StompRespon) => {
  const { market = {}, removeMarket = [], sendType } = stompRespond ?? {}
  if (sendType === 'INIT') {
    return market
  }

  const newMarket = { ...prev }
  if (sendType === 'UPDATE') {
    Object.entries(market).forEach(([mkKey, mkVal]) => {
      newMarket[mkKey] = mkVal
    })
  }

  removeMarket.forEach((key) => {
    key in newMarket && (delete newMarket[key])
  })
  return newMarket
}

const empty = { connected: false }

const useStompUpdate = ({ sid, iid, inplay, initServerTime }: { sid: Sid, iid: number, inplay: boolean, initServerTime: string }) => {
  // const stompClient = useSelector((store: any) => store?.sports?.stompClient)
  const stompClient = empty
  const [isInit, setIsInit] = useState<boolean>(false)
  const [gameInfo, setGameInfo] = useState({})
  const [market, setMarket] = useState({})
  const [serverTime, setServerTime] = useState<string>(initServerTime)
  const [mkCount, setMkcount] = useState<number>(0)
  const [infoID, setInfoID] = useState<string | null>(null)
  const [oddsID, setOddsID] = useState<string | null>(null)

  useEffect(() => {
    if (!stompClient?.connected) return

    // const matchIID = stompClient.subscribe(`${SUBSCRIBE_ODDS_DIFF_URL}${iid}`, (msg: any) => {
    //   const params = JSON.parse(msg.body)
    //   setMkcount(params.count)
    //   // setMarket(params.market)
    //   setMarket(prev => _parseUpdateMarket(prev, params))
    //   setIsInit(true)
    //   if (!inplay) {
    //     const serverTime = msg.headers?.timestamp
    //     serverTime && setServerTime(msg.headers.timestamp)
    //   }
    // })

    // const inplayInfo = inplay && stompClient.subscribe(`${SUBSCRIBE_INPLAY_INFO_URL}${iid}`, (msg: any) => {
    //   const params = JSON.parse(msg.body)
    //   const serverTime = msg.headers?.timestamp
    //   serverTime && setServerTime(msg.headers.timestamp)
    //   setGameInfo(params)
    // })

    // const currentConnectId_info = inplayInfo?.id
    // const currentConnectId_odds = matchIID?.id
    // currentConnectId_info && setInfoID(currentConnectId_info)
    // currentConnectId_odds && setOddsID(currentConnectId_odds)

    // return () => {
    //   matchIID.unsubscribe()
    //   inplay && inplayInfo?.unsubscribe()

    //   setInfoID(null)
    //   setOddsID(null)
    // }

  }, [stompClient, sid, iid, inplay])

  return {
    isInit,
    infoID,
    oddsID,
    mkCount,
    serverTime,
    gameInfo,
    market
  }
}

export {
  useStompUpdate
}
