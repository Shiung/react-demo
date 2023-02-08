import { useCallback, useEffect, useMemo, useState } from 'react'
// import { useSelector, useDispatch } from 'react-redux'
// import types from '@/constants/actionTypes'
import { useLeagueContext, emptyLs } from './league-context'
import { Sid }  from '../constants'
import {
  TournamentObj,
  MatchObj,
  BallType,
  MarketCatList,
  UnitMarketList,
  ParseMarketResultObjList
} from '../types'
// import SportsApi from '@/api/SportsApi'
import API from '@/api'

import { marketSetting as marketSettingFake } from './fake'

import { getMarketsCateTypesFromArray, sortMarketlist } from '@utils/index' // '@utils/sportUtil'

export const useFetchResultLeagueData = ({ sid, date }: { sid: Sid, date: string }) => {
  // const dispatch = useDispatch()
  const { updateLoading, updateLs } = useLeagueContext()

  const fetchData = useCallback(async () => {
    if (!sid || !date) return []
    updateLoading(true)
    const errorHandler = (e: { code: number }) => {
      if (e.code === 0) return false
      else {
        // dispatch({
        //   type: types.SET_ERROR_STATUS,
        //   payload: e
        // })
        console.log('error')
        return true
      }
    }

    // const params = {
    //   sid,
    //   startDate: `${date} 00:00:00`,
    //   endDate: `${date} 23:59:59`
    // }

    // @ts-ignore: Unreachable code error
    const res = await API.getGameResultAll() // await new SportsApi().getGameResultAll(params)

    updateLoading(false)
    if (errorHandler(res)) return

    updateLs(res.data?.categories ?? emptyLs)

  }, [sid, date, updateLoading, updateLs])

  useEffect(() => {
    fetchData()
    return () => {
      updateLs(emptyLs)
    }
  }, [fetchData, updateLs])
}

const emptyMatchData: TournamentObj = {
  tid: NaN,
  tnName: '',
  matches: []
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

const emptyMarkets: string[] = []

const emptyMarketCats: MarketCatList = []

export const useTournamentMatchData = ({ tid }: { tid: string }) => {
  const { filterLs } = useLeagueContext()
  const [data, setData] = useState<TournamentObj>(emptyMatchData)
  useEffect(() => {
    if (tid) {
      for (const l of filterLs) {
        const findtSomething = l.tournaments.find(t => t.tid === Number(tid))
        if (findtSomething) {
          setData(findtSomething)
          break
        }
      }
    }
    return () => {
      setData(emptyMatchData)
    }
  }, [filterLs, tid])

  return data
}

export const useDetailMatchData = ({ tid, iid }: { tid: string, iid: string }) => {
  const { filterLs } = useLeagueContext()
  const [leagueName, setLeagueName] = useState<string>('')
  const [data, setData] = useState<MatchObj>(emptyDetailData)

  useEffect(() => {
    if (tid && iid) {
      for (const l of filterLs) {
        const matchTournament = l.tournaments.find(t => t.tid === Number(tid))
        if (matchTournament) {
          const matchDetail = matchTournament?.matches.find(d => d.iid === Number(iid))
          if (matchDetail) {
            setData(matchDetail)
            setLeagueName(matchTournament.tnName)
            break
          }
        }
      }
    }
    return () => {
      setData(emptyDetailData)
      setLeagueName('')
    }
  }, [filterLs, tid, iid])

  return {
    data,
    leagueName
  }
}

export const useDetailMarketsList = ({ ballType, iid }: { ballType: BallType, iid: string }) => {
  // const marketSetting = useSelector((state: any) => state.sports.setting ?? {})
  const [markets, setMarkets] = useState<string[]>(emptyMarkets) // orgin fetch markets list data
  const [marketCat, setMarketCat] = useState<MarketCatList>(emptyMarketCats)
  const [activeCat, setActiveCat] = useState<string>('all')
  const [loading, setLoading] = useState<boolean>(false)

  const handleMarketCatActive = useCallback(val => setActiveCat(val), [])

  // const dispatch = useDispatch()
  const fetchData = useCallback(async () => {
    if (!iid) return
    setLoading(true)
    const errorHandler = (e: { code: number }) => {
      if (e.code === 0) return false
      else {
        // dispatch({
        //   type: types.SET_ERROR_STATUS,
        //   payload: e
        // })
        console.log('error')
        return true
      }
    }


    // const res = await new SportsApi().getGameResultMarkets({ iid })
    // @ts-ignore: Unreachable code error
    const res = await API.getGameResultMarkets()

    setLoading(false)
    if (errorHandler(res)) return
    setMarkets(res?.data?.market ?? emptyMarkets)
  }, [iid])

  // market category list
  useEffect(() => {
    const marketSetting = marketSettingFake
    const listOfCatName = getMarketsCateTypesFromArray(markets, ballType, marketSetting)
      .map(key => {
        return {
          id: key,
          i18n: (key === 'all' && ballType === Sid[Sid.baseball])
            ? 'sport.simpleTitle.ah_score'
            : `banner.${key}`
        }
      })

    setMarketCat(listOfCatName)
  }, [ballType, markets])

  // market category filter markets list
  const marketsFilter = useMemo(() => {
    const marketSetting = marketSettingFake
    const marketMap = marketSetting[ballType] ?? {}
    return sortMarketlist({ markets, sortKey: activeCat, marketSetting: marketMap, ballType })
  }, [ballType, markets, activeCat])

  // init & reset
  useEffect(() => {
    fetchData()
    return () => {
      setMarkets(emptyMarkets)
      setMarketCat(emptyMarketCats)
      setActiveCat('all')
    }
  }, [fetchData])

  return {
    markets,
    marketsFilter,
    marketCat,
    activeCat,
    handleMarketCatActive,
    loading
  }
}

const emptyUnitMarket: UnitMarketList = []

export const useUnitMarketData = ({
  open,
  ballType,
  iid,
  market,
  homeName,
  awayName
}: {
  open: boolean,
  ballType: BallType,
  iid: string,
  market: string,
  homeName: string,
  awayName: string
}) => {
  // const marketSetting = useSelector((state: any) => state.sports.setting ?? {})
  const [resultData, setResultData] = useState<UnitMarketList>(emptyUnitMarket)
  const [isReady, setIsReady] = useState<boolean>(false)

  // const dispatch = useDispatch()
  const fetchData = useCallback(async () => {
    if (!iid || !market) return
    setIsReady(false)
    const errorHandler = (e: { code: number }) => {
      if (e.code === 0) return false
      else {
        // dispatch({
        //   type: types.SET_ERROR_STATUS,
        //   payload: e
        // })
        console.log('error')
        return true
      }
    }

    // @ts-ignore: Unreachable code error
    // const res = await new SportsApi().getGameResultMarket({ iid, market })
    const res = await API.getGameResultMarket()

    if (errorHandler(res)) return
    setIsReady(true)
    setResultData(res?.data?.result ?? emptyUnitMarket)
  }, [iid, market])

  const parseTitle = useCallback((title)  => {
    if (title.includes('%home%')) return title.replace(/%home%/g, homeName)
    if (title.includes('%away%')) return title.replace(/%away%/g, awayName)
    return title
  }, [homeName, awayName])

  const marketConf = useMemo(() => {
    const marketSetting = marketSettingFake as any
    const mappingSetting = marketSetting[ballType][market]
    return {
      ...mappingSetting,
      marketName: parseTitle( mappingSetting?.name ?? '' )
    }
  }, [ballType, market, parseTitle])

  const parseResultData = useMemo<ParseMarketResultObjList>(() => {
    const matchConf = (beton: string) => marketConf?.betOn?.find(({ key }: { key: string }) => key === beton)

    const parseReplaceTitle = (title: string, k: string) => {
      let parseTitle = title
      title.includes('%home%') && (parseTitle = parseTitle.replace(/%home%/g, homeName))
      title.includes('%away%') && (parseTitle = parseTitle.replace(/%away%/g, awayName))
      title.includes('%k%') && (parseTitle = parseTitle.replace(/%k%/g, k))
      return parseTitle
    }

    return resultData.map(result => {
      const matchSetting = matchConf(result.betOn)
      return {
        ...result,
        title: parseReplaceTitle(matchSetting?.display ?? '', result.k),
        settingBetOn: matchSetting
      }
    })
  }, [marketConf, resultData, homeName, awayName])

  useEffect(() => {
    open && !isReady && fetchData()
  }, [open, isReady, fetchData])

  return {
    isReady,
    marketName: marketConf.marketName,
    layout: marketConf.layout,
    parseResultData
  }
}
