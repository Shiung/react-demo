import * as Group from '../../../../containers/Group'//'@/sports/components/WorldCupModule/containers/Group'
import { useGroupRoundContext } from '../../../../store/GroupRoundContext'//'@sport/components/WorldCupModule/store/GroupRoundContext'

const Groupping = () => {
  const { groupData } = useGroupRoundContext()
  return <Group.List ls={groupData} />
}

export default Groupping
