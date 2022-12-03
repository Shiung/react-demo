import * as Group from '../../../../../containers/Group' //'@/sports/components/WorldCupModule/containers/Group'
import { usePreGameContext } from '../../../../../store/PreGameContext' // '@sport/components/WorldCupModule/store/PreGameContext'

const Groupping = () => {
  const { groupData } = usePreGameContext()
  return <Group.ListEventWithoutNav ls={groupData} />
}

export default Groupping
