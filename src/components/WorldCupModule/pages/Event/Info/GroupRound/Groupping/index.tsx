import * as Group from '../../../../../containers/Group' // '@/sports/components/WorldCupModule/containers/Group'
import { useGroupRoundContext } from '../../../../../store/GroupRoundContext' // '@sport/components/WorldCupModule/store/GroupRoundContext'
import VoteUserContextProvider from '../../../../../store/VoteUserContext' // '@sport/components/WorldCupModule/store/VoteUserContext'
import { PageVoteResultName } from '../../../../../constants' //'@sport/components/WorldCupModule/constants'

import CheckVote from '../../../../../components/CheckVote' // '@sport/components/WorldCupModule/components/CheckVote'

const Groupping = () => {
  const { groupData } = useGroupRoundContext()
  return (
    <VoteUserContextProvider type={2}>
      <Group.ListEvent ls={groupData} />
      {groupData.length !== 0 && <CheckVote type={PageVoteResultName.roundOf32} />}
    </VoteUserContextProvider>
  )
}

export default Groupping
