import * as Group from '@/sports/components/WorldCupModule/containers/Group'
import { useGroupRoundContext } from '@sport/components/WorldCupModule/store/GroupRoundContext'

const Chart = () => {
  const { groupData } = useGroupRoundContext()
  return (
    <div style={{ padding: '15px' }}>
      <Group.Chart ls={groupData} />
    </div>
  )
}

export default Chart
