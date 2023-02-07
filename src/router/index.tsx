import Home from '../components/Home'
import { wouldCupName, wouldCupEventName } from '@WorldCup/constants' // '../components/WorldCupModule/constants'
import WorldCup from '@WorldCup/pages/Game' // '../components/WorldCupModule/pages/Game'
import WorldCupEvent from '@WorldCup/pages/Event' // '../components/WorldCupModule/pages/Event'
import BallAnimatePage from '@BallAnimate/index'


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
  },
  {
    path: '/ballAnimate',
    Component: BallAnimatePage,
    exact: true
  }
]
