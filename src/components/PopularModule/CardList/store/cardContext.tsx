import React, { useState, useEffect, createContext, useContext } from 'react'
// import { useSelector } from 'react-redux'
// import device, { DEVICE } from '@/utils/device'
import { useStompUpdate }  from '../hooks/useStomp'
import { Sid, simpleType } from '../../constants'
import type { DataObj } from '../../types'
import Skeleton from '../Mobile/Skeleton'

type DataPart = Partial<DataObj>

type CardContextStore = {
  data: DataPart,
  mkCount: number,
  serverTime: string,
  gameInfo: any
  isInter: boolean,
  market: any
}

const emptyObj: DataPart = {}

export const CardContext = createContext<CardContextStore>({
  data: emptyObj,
  mkCount: 0,
  serverTime: '',
  gameInfo: {},
  isInter: false,
  market: null
})

type Props = {
  sid: Sid,
  iid: number,
  apiData: DataObj
}

const CardContextProvider: React.FC<Props> = ({ sid, iid, apiData, children }) => {
  // const wapSimpleType = useSelector((store: any) => store.sports.wapSimpleType)
  const [data, setData] = useState<DataPart>(emptyObj)
  // const isInter = device === DEVICE.MOBILE
  //   ? wapSimpleType === simpleType.inter
  //   : true
  const isInter = false
  useEffect(() => {
    setData(apiData)
  }, [apiData])

  const {
    isInit, infoID, oddsID, mkCount, serverTime, gameInfo, market
  } = useStompUpdate({ sid, iid, inplay: apiData?.inplay, initServerTime: apiData?.serverTime })

  const contextVal: CardContextStore = {
    data,
    mkCount,
    serverTime,
    gameInfo,
    isInter,
    market
  }

  return (
    <CardContext.Provider value={contextVal}>
      {!isInit && <Skeleton />}
      {isInit && React.isValidElement(children) && React.cloneElement<any>(children, {
        'data-iid': iid,
        'data-sid': sid,
        'data-info': infoID,
        'data-odds': oddsID
      })}
    </CardContext.Provider>
  )
}

export const useCardContext = () => {
  return useContext(CardContext)
}

export default CardContextProvider
