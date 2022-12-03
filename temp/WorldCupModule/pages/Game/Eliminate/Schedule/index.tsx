import { useEliminateContext } from '@sport/components/WorldCupModule/store/EliminateContext'
import * as Group from '@/sports/components/WorldCupModule/containers/Group'

const Schedule = () => {
  const { data } = useEliminateContext()
  return <Group.Schedule ls={data} />
}

export default Schedule
