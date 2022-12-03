import { useGroupRoundContext } from '../.../../../../../store/GroupRoundContext' //'@sport/components/WorldCupModule/store/GroupRoundContext'
import * as Group from '../../../../containers/Group'//'@/sports/components/WorldCupModule/containers/Group'

const Schedule = () => {
  const { data } = useGroupRoundContext()
  return <Group.Schedule ls={data} />
}

export default Schedule
