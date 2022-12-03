import * as Group from '@/sports/components/WorldCupModule/containers/Group'
import { usePreGameContext } from '@sport/components/WorldCupModule/store/PreGameContext'

const Groupping = () => {
  const { groupData } = usePreGameContext()
  return <Group.List ls={groupData} disableNav />
}

export default Groupping
