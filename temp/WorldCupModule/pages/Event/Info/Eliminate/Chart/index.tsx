import * as Group from '@/sports/components/WorldCupModule/containers/Group'
import CheckVote from '@sport/components/WorldCupModule/components/CheckVote'
import { PageVoteResultName } from '@sport/components/WorldCupModule/constants'

import VoteUserContextProvider from '@sport/components/WorldCupModule/store/VoteUserContext'

const Chart = () => {
  return (
    <VoteUserContextProvider type={3}>
      <Group.TreeEvent />
      <CheckVote type={PageVoteResultName.roundOf16} />
    </VoteUserContextProvider>
  )
}

export default Chart
