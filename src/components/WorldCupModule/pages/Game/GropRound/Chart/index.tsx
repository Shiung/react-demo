import * as Group from '../../../../containers/Group'//'@/sports/components/WorldCupModule/containers/Group'
import { useGroupRoundContext } from '../../../../store/GroupRoundContext'//'@sport/components/WorldCupModule/store/GroupRoundContext'

const Chart = () => {
  const { groupData } = useGroupRoundContext()
  return (
    <div style={{ padding: '15px' }}>
      <Group.Chart ls={groupData} />
    </div>
  )
}

export default Chart
