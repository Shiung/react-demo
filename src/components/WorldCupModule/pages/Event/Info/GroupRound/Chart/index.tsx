import * as Group from '../../../../../containers/Group' //'@/sports/components/WorldCupModule/containers/Group'
import { useGroupRoundContext } from '../../../../../store/GroupRoundContext' // '@sport/components/WorldCupModule/store/GroupRoundContext'
import { PageVoteResultName } from '../../../../../constants' // '@sport/components/WorldCupModule/constants'

import VoteUserContextProvider from '../../../../../store/VoteUserContext' // '@sport/components/WorldCupModule/store/VoteUserContext'
import CheckVote from '../../../../../components/CheckVote' // '@sport/components/WorldCupModule/components/CheckVote'

const Chart = () => {
  const { groupData } = useGroupRoundContext()
  return (
    <VoteUserContextProvider type={2}>
      <div style={{ padding: '15px' }}>
        <Group.ChartEvent ls={groupData} />
      </div>
      {groupData.length !== 0 && <CheckVote type={PageVoteResultName.roundOf32} />}
    </VoteUserContextProvider>
  )
}

export default Chart
