import { RouterPathConf } from '../../constants'

import Info from './Info'
import Vote from './Vote'

export const routes = [
  {
    ...RouterPathConf.event.info,
    Component: Info,
    exact: false,
    navUse: true
  },
  {
    ...RouterPathConf.event.voteResult,
    Component: Vote,
    exact: false,
    navUse: false
  }
]
