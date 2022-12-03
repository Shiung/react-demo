import { RouterPathConf } from '../../constants'

import Pregame from './PreGame'
import GropRound from './GropRound'
import Eliminate from './Eliminate'

export const routes = [
  {
    ...RouterPathConf.game.preGame,
    Component: Pregame,
    exact: false
  },
  {
    ...RouterPathConf.game.groupRound,
    Component: GropRound,
    exact: false
  },
  {
    ...RouterPathConf.game.eliminate,
    Component: Eliminate,
    exact: false
  }
]