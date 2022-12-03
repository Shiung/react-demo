import { useRef, useState, useMemo, useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import SportsApi from '@sport/api/SportsApi'

import { SUBSCRIBE_INPLAY_INFO_URL } from '@sport/stompWs'

import { OT_TIME, PK_TIME } from '@sport/constants/periodMapping'

import type { InfoDetail } from '@sport/components/WorldCupModule/types'
import { StatesConst } from '@sport/components/WorldCupModule/constants'
import types from '@sport/constants/actionTypes'
import { useStreamContext } from '@sport/components/WorldCupModule/store/StreamContext'

type HistoryData = {
  teams: string[],
  year: string,
  url: { [key in string]: string }
}

const useFetchHistory = () => {
  const [data, setData] = useState<HistoryData[]>([])
  const isDestory = useRef<boolean>(false)

  const fetchData = useCallback(async () => {
    const res = await new SportsApi().getWorldCupHistoryList()
    if (isDestory.current) return
    if (!(res instanceof Error)) {
      setData(res)
    } else {
      setData([])
    }
  }, [])

  useEffect(() => {
    isDestory.current = false
    fetchData()
    return () => {
      isDestory.current = true
    }
  }, [fetchData])

  return {
    data
  }
}

const __selectedCheck = ({
  prev, ls, action
}: {
  prev: number
  ls: Array<{ iid: number, statePhase: StatesConst }>
  action: React.Dispatch<React.SetStateAction<number>>
}) => {
  if (ls.length === 0) return
  const hasExist = ls.findIndex(({ iid }) => iid === prev) !== -1
  if (hasExist) return
  const hasInplay = ls.find(({ statePhase }) => statePhase === StatesConst.INPLAY)
  if (hasInplay) {
    return action(hasInplay.iid)
  } else {
    return action(ls[0].iid)
  }
}

const useStreamData = () => {
  const [selected, setSelected] = useState<number>(0)
  const preSelectRef = useRef<number>(selected)
  const { ls } = useStreamContext()

  const selectedHandler = useCallback((iid: number) => setSelected(iid), [])

  useEffect(() => {
    preSelectRef.current = selected
  }, [selected])

  useEffect(() => {
    __selectedCheck({
      prev: preSelectRef.current,
      ls,
      action: setSelected
    })
  }, [ls])

  return {
    ls,
    selected,
    selectedHandler,
    currentGame: useMemo(() => ls.find(({ iid }) => iid === selected), [ls, selected])
  }
}

const _parseScore = (score: string, showEmpty: boolean = false) => {
  const scoreReturn = {
    l_score: 0,
    r_score: 0
  }

  const emptyReturn = {
    l_score: '-',
    r_score: '-'
  }

  if (!score) return showEmpty ? emptyReturn : scoreReturn

  const scoreSplit = score.split('-')
  return {
    l_score: scoreSplit[0],
    r_score: scoreSplit[1]
  }
}

const useParseScore = (detail: Partial<InfoDetail>, isInplay: boolean) => {
  const {
    period = '',
    score = '',
    ot = '',
    pk = '',
  } = detail 

  return useMemo(() => {
    if (!isInplay) return _parseScore('', true)
    if (OT_TIME.includes(period)) return _parseScore(ot, false)
    if (PK_TIME.includes(period)) return _parseScore(pk, false)
    return _parseScore(score, false)
  }, [period, score, ot, pk, isInplay])
}

const useStompUpdateForLive = ({ iid, inplay }: {
  iid: number,
  inplay: boolean,
}) => {
  const stompClient = useSelector((store: any) => store?.sports?.stompClient)
  const [infoID, setInfoID] = useState<string | null>(null)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!stompClient?.connected) return

    const inplayInfo = inplay && stompClient.subscribe(`${SUBSCRIBE_INPLAY_INFO_URL}${iid}`, (msg: any) => {
      const params = JSON.parse(msg.body)
      dispatch({
        type: types.SET_LIVE_INFO,
        payload: {
          ...params,
          liveUrl: params?.urls?.length ? params?.urls[0].url : '',
          detail: {
            ...params
          }
        }
      })
    })

    const currentConnectId_info = inplayInfo?.id
    currentConnectId_info && setInfoID(currentConnectId_info)

    return () => {
      inplay && inplayInfo?.unsubscribe()
      setInfoID(null)
    }
  }, [stompClient, iid, inplay, dispatch])

  useEffect(() => {
    return () => {
      // reset live store
      dispatch({
        type: types.SET_LIVE_INFO,
        payload: {
          streaming: 0,
          mid: '',
          rid: '',
          iid: '',
          sid: '',
          detail: {},
          vendor: '',
          realLive: []
        }
      })
    }
  }, [dispatch])

  return {
    infoID
  }
}

export {
  useFetchHistory,
  useStreamData,
  useParseScore,
  useStompUpdateForLive
}
