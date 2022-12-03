import * as Group from '../../../../containers/Group' //'@/sports/components/WorldCupModule/containers/Group'
import { usePreGameContext } from '../../../../store/PreGameContext' //'@sport/components/WorldCupModule/store/PreGameContext'

const Groupping = () => {
  const { groupData } = usePreGameContext()
  return <Group.List ls={groupData} disableNav />
}

export default Groupping
