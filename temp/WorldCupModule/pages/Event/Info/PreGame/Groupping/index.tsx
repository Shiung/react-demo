import * as Group from '@/sports/components/WorldCupModule/containers/Group'
import { usePreGameContext } from '@sport/components/WorldCupModule/store/PreGameContext'

const Groupping = () => {
  const { groupData } = usePreGameContext()
  return <Group.ListEventWithoutNav ls={groupData} />
}

export default Groupping
