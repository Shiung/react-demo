import { useEliminateContext } from '../../../../../store/EliminateContext' // '@sport/components/WorldCupModule/store/EliminateContext'
import * as Group from '../../../../../containers/Group' //'@/sports/components/WorldCupModule/containers/Group'

const Schedule = () => {
  const { data } = useEliminateContext()
  return <Group.ScheduleEvent ls={data} />
}

export default Schedule
