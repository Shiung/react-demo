import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { SUBSCRIBE_INPLAY_INFO_URL } from '@sport/stompWs'

import type { StompResInfo } from '@sport/components/WorldCupModule/types'

const useStompUpdate = ({ iid, inplay, initServerTime }: {
  iid: number,
  inplay: boolean,
  initServerTime: string
}) => {
  const stompClient = useSelector((store: any) => store?.sports?.stompClient)
  const [gameInfo, setGameInfo] = useState<StompResInfo>({})
  const [serverTime, setServerTime] = useState<string>(initServerTime)
  const [infoID, setInfoID] = useState<string | null>(null)

  useEffect(() => {
    if (!stompClient?.connected) return

    const inplayInfo = inplay && stompClient.subscribe(`${SUBSCRIBE_INPLAY_INFO_URL}${iid}`, (msg: any) => {
      const params = JSON.parse(msg.body)
      const serverTime = msg.headers?.timestamp      
      serverTime && setServerTime(msg.headers.timestamp)
      setGameInfo(params)
    })

    const currentConnectId_info = inplayInfo?.id
    currentConnectId_info && setInfoID(currentConnectId_info)

    return () => {
      inplay && inplayInfo?.unsubscribe()
      setInfoID(null)
    }
  }, [stompClient, iid, inplay])

  return {
    gameInfo,
    serverTime,
    infoID
  }
}

export {
  useStompUpdate
}