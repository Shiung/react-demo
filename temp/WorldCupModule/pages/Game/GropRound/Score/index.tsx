import { useMemo } from 'react'

import { useWorldCupContext } from '@sport/components/WorldCupModule/store/WorldCupContext'

import * as Group from '@/sports/components/WorldCupModule/containers/Group'

const Score = () => {
  const { scoreLs } = useWorldCupContext()

  const data = useMemo(() => {
    const returnObj: any = { ...scoreLs } 
    for (let groupKey of Object.keys(returnObj)) {
      returnObj[groupKey].subShow = {
        show: true
      }
    }
    return returnObj
  }, [scoreLs])

  return <Group.Score jsonData={data} />
}

export default Score
