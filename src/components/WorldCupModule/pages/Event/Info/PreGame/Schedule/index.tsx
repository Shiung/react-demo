import { usePreGameContext } from '../../../../../store/PreGameContext' //'@sport/components/WorldCupModule/store/PreGameContext'
import * as Group from '../../../../../containers/Group' // '@/sports/components/WorldCupModule/containers/Group'

const Schedule = () => {
  const { data } = usePreGameContext()
  return <Group.ScheduleEvent ls={data} />
}

export default Schedule
