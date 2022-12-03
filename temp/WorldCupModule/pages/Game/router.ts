import { RouterPathConf } from '../../constants'

import Pregame from '../Game/PreGame'
import GropRound from '../Game/GropRound'
import Eliminate from '../Game/Eliminate'

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