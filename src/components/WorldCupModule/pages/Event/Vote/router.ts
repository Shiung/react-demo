import { RouterPathConf, PageVoteResultName } from '../../../constants'//'@sport/components/WorldCupModule/constants'

import RoundOf32 from './RoundOf32'
import RoundOf16 from './RoundOf16'

export const routes = RouterPathConf.event.voteResult.children.map((r) => {
  const ParseComp = (name: PageVoteResultName) => {
    switch (name) {
      case PageVoteResultName.roundOf16:
        return RoundOf16
      case PageVoteResultName.roundOf32:
        return RoundOf32
    }
  }
  return {
    ...r,
    Component: ParseComp(r.name),
    exact: true
  }
})
