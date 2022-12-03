import * as Group from '../../../../../containers/Group' // '@/sports/components/WorldCupModule/containers/Group'
import CheckVote from '../../../../../components/CheckVote' // '@sport/components/WorldCupModule/components/CheckVote'
import { PageVoteResultName } from '../../../../../constants' // '@sport/components/WorldCupModule/constants'

import VoteUserContextProvider from '../../../../../store/VoteUserContext' //'@sport/components/WorldCupModule/store/VoteUserContext'

const Chart = () => {
  return (
    <VoteUserContextProvider type={3}>
      <Group.TreeEvent />
      <CheckVote type={PageVoteResultName.roundOf16} />
    </VoteUserContextProvider>
  )
}

export default Chart
