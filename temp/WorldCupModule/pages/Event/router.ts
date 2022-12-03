import { RouterPathConf } from '../../constants'

import Info from './Info'
import Stream from './Stream'
import Character from './Character'
import Vote from './Vote'

export const routes = [
  {
    ...RouterPathConf.event.info,
    Component: Info,
    exact: false,
    navUse: true
  },
  {
    ...RouterPathConf.event.stream,
    Component: Stream,
    exact: false,
    navUse: true
  },
  {
    ...RouterPathConf.event.character,
    Component: Character,
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
