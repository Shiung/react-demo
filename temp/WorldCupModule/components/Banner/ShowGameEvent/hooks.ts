import { useMemo, useState, useEffect } from 'react'
import type { GameInfo } from '@sport/components/WorldCupModule/types'

import { dateTransformMethod } from '@sport/utils/dateTransform'

import { useStreamContext } from '@sport/components/WorldCupModule/store/StreamContext'

const EmptyData: Partial<GameInfo> = {}

const useGameInfo = () => {
  const [data, setData] = useState(EmptyData)
  const { ls } = useStreamContext()

  useEffect(() => {
    ls.length > 0 ? setData(ls[0]) : setData(EmptyData)
  }, [ls])

  const showDate = useMemo(() => {
    return dateTransformMethod(data?.kickOffTime, true) as any
  }, [data])

  return {
    showDate,
    homeId: data.homeId,
    awayId: data.awayId,
    roundGroup: data.roundGroup
  }
}

export {
  useGameInfo
}
