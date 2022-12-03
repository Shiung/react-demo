import { useGroupRoundContext } from '@sport/components/WorldCupModule/store/GroupRoundContext'
import * as Group from '@/sports/components/WorldCupModule/containers/Group'

const Schedule = () => {
  const { data } = useGroupRoundContext()
  return <Group.Schedule ls={data} />
}

export default Schedule
