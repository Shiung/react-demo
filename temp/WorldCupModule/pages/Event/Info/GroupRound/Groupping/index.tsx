import * as Group from '@/sports/components/WorldCupModule/containers/Group'
import { useGroupRoundContext } from '@sport/components/WorldCupModule/store/GroupRoundContext'
import VoteUserContextProvider from '@sport/components/WorldCupModule/store/VoteUserContext'
import { PageVoteResultName } from '@sport/components/WorldCupModule/constants'

import CheckVote from '@sport/components/WorldCupModule/components/CheckVote'

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
