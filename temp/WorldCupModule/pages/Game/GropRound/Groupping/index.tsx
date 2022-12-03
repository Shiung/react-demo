import * as Group from '@/sports/components/WorldCupModule/containers/Group'
import { useGroupRoundContext } from '@sport/components/WorldCupModule/store/GroupRoundContext'

const Groupping = () => {
  const { groupData } = useGroupRoundContext()
  return <Group.List ls={groupData} />
}

export default Groupping
