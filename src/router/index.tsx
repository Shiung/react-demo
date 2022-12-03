import Home from '../components/Home'
import { wouldCupName, wouldCupEventName } from '../components/WorldCupModule/constants'
import WorldCup from '../components/WorldCupModule/pages/Game'
import WorldCupEvent from '../components/WorldCupModule/pages/Event'


export const routerConf = [
  {
    path: '/',
    Component: Home,
    exact: true
  },
  // 世界杯
  {
    path: `/${wouldCupName}`,
    Component: WorldCup,
    exact: false
  },
  {
    path: `/${wouldCupEventName}`,
    Component: WorldCupEvent,
    exact: false
  }
]
