import Home from '../components/Home'
import { wouldCupName, wouldCupEventName } from '@WorldCup/constants' // '../components/WorldCupModule/constants'
import WorldCup from '@WorldCup/pages/Game' // '../components/WorldCupModule/pages/Game'
import WorldCupEvent from '@WorldCup/pages/Event' // '../components/WorldCupModule/pages/Event'
import BallAnimatePage from '@BallAnimate/index'
import ResultPage from '@Result/entry'
import PopularPage from '@Popular/entry'
import Promote from '@/components/Promote'
import MarqueeEntry from '@/components/Marquee/Entry'

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
  },
  {
    path: '/gameResult',
    Component: ResultPage,
    exact: false
  },
  // 推薦卡片
  {
    path: '/popular',
    Component: PopularPage,
    exact: false
  },
  // 跑馬燈
  {
    path: '/Promote',
    Component: Promote,
    exact: true
  },
  // 跑馬燈 marquee
  {
    path: '/marquee',
    Component: MarqueeEntry,
    exact: true
  }
]
