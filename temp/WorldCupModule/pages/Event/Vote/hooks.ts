import { useMemo, useCallback, useRef, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useWorldCupContext } from '@sport/components/WorldCupModule/store/WorldCupContext'

import { RoundConf } from '@sport/components/WorldCupModule/constants'
import type { RoundOnlyGroup } from '@sport/components/WorldCupModule/types'

import SportsApi from '@sport/api/SportsApi'

type VoteResult = {
  id: number
  gPercent?: number
  tPercent: number
  promotion?: string 
}

type DataFor32 = {
  group: RoundConf
  ls: Array<VoteResult>
  hasBlock?: boolean 
}[]

type ApiVote = {
  vote: Array<{ teamId: number, type: string, group: RoundOnlyGroup, count: number}>
  total: number
}

const EmptyData: ApiVote = {
  vote: [],
  total: 0
}

const _parseAward = (
  ls: Array<{ teamId: number, type: string, group: RoundOnlyGroup, count: number}> = [],
  idx: number
) => {
  const unit = ls[idx]
  return !unit
    ? 0
    : unit.count !== 0 ? unit.teamId : 0
}

const useData = () => {
  const { finishInfoPromotion = false } = useSelector<any, { token: string, finishInfoPromotion: boolean }>(store => store.user.info)
  const { groupMapping, scoreLs } = useWorldCupContext()
  const [data, setData] = useState<ApiVote>(EmptyData)
  const isDestory = useRef<boolean>(false)

  const fetchData = useCallback(async () => {
    const res = await new SportsApi().getWorldCupVote({ type: 2 })
    if (isDestory.current) return
    if (res.code === 0) {
      setData(res.data)
    }
  }, [])

  const ls = useMemo<DataFor32>(() => {
    const hasCheckBlock = !finishInfoPromotion
    const totalCount = data.total

    const groupTotalCount = data.vote.reduce((prev, curr) => {
      const { group, count } = curr
      if (!(group in prev)) return prev
      const { [group]: prevGroupCOunt = 0 } = prev
      return {
        ...prev,
        [group]: prevGroupCOunt + count
      }
    }, {
      [RoundConf.A]: 0,
      [RoundConf.B]: 0,
      [RoundConf.C]: 0,
      [RoundConf.D]: 0,
      [RoundConf.E]: 0,
      [RoundConf.F]: 0,
      [RoundConf.G]: 0,
      [RoundConf.H]: 0
    })

    return groupMapping.map(({ group, teams }) => {
      const hasBlock = hasCheckBlock && ['E', 'F', 'G', 'H'].includes(group)
      const groupScore = scoreLs?.[group] ?? []
      const currentGroupTotal = groupTotalCount[group as RoundOnlyGroup] ?? 0
      const groupTotal = currentGroupTotal !== 0 ? currentGroupTotal : 1
      return {
        group,
        hasBlock,
        ls: teams.map((i) => {
          const apiDataCount = data.vote.find(({ teamId }) => teamId === i)?.count ?? 0
          return {
            id: i,
            gPercent: Math.round(apiDataCount / groupTotal * 100),
            tPercent: Math.round(apiDataCount / totalCount * 100),
            promotion: groupScore.find(({ team }) => team === i)?.promotion ?? ''
          }
        })
      }
    })
  }, [groupMapping, scoreLs, finishInfoPromotion, data])

  const AwardLs = useMemo<number[]>(() => {
    const copyData = [...data.vote].sort((a, b) => b.count - a.count)
    return [
      _parseAward(copyData, 0),
      _parseAward(copyData, 1),
      _parseAward(copyData, 2),
    ]
  }, [data])

  useEffect(() => {
    isDestory.current = false
    fetchData()
    return () => {
      isDestory.current = true
    }
  }, [fetchData])

  return { ls, AwardLs }
}

const useDataFor16 = () => {
  const { finishInfoPromotion = false } = useSelector<any, { token: string, finishInfoPromotion: boolean }>(store => store.user.info)
  const [data, setData] = useState<ApiVote>(EmptyData)
  const isDestory = useRef<boolean>(false)

  const fetchData = useCallback(async () => {
    const res = await new SportsApi().getWorldCupVote({ type: 3 })
    if (isDestory.current) return
    if (res.code === 0) {
      setData(res.data)
    }
  }, [])

  const ls = useMemo<Array<VoteResult>>(() => {
    const totalCount = data.total
    const apiLs = data.vote.sort((a, b) => b.count - a.count)
    const lsLen = apiLs.length
    const returnArr = apiLs.map(({ teamId, count }) => ({
      id: teamId,
      tPercent: Math.round(count / totalCount * 100)
    }))

    return returnArr.concat(Array.from({ length: 16 - lsLen }, (_, i) => ({
      id: 0,
      tPercent: 0
    })))
  }, [data])

  const AwardLs = useMemo<number[]>(() => {
    const copyData = [...data.vote].sort((a, b) => b.count - a.count)
    return [
      _parseAward(copyData, 0),
      _parseAward(copyData, 1),
      _parseAward(copyData, 2),
    ]
  }, [data])

  useEffect(() => {
    isDestory.current = false
    fetchData()
    return () => {
      isDestory.current = true
    }
  }, [fetchData])

  return {
    ls,
    AwardLs,
    hasBlock: !finishInfoPromotion
  }
}

export type { VoteResult }
export { useData, useDataFor16 }
