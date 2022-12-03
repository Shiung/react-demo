import { useMemo } from 'react'

import { useWorldCupContext } from '../../../../store/WorldCupContext' //'@sport/components/WorldCupModule/store/WorldCupContext'

import * as Group from '../../../../containers/Group' //'@/sports/components/WorldCupModule/containers/Group'

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

  // return <Group.Score jsonData={data} />
  return <div>積分表</div>
}

export default Score
