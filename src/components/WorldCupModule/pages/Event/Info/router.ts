import { RouterPathConf, PageNameSecond } from '../../../constants' //'@sport/components/WorldCupModule/constants'
import PreGame from './PreGame'
import GroupRound from './GroupRound'
import Eliminate from './Eliminate'

export const routes = RouterPathConf.event.info.children.map((r) => {
  const ParseComp = (name: PageNameSecond) => {
    switch (name) {
      case PageNameSecond.preGameName:
        return PreGame
      case PageNameSecond.groupRoundName:
        return GroupRound
      case PageNameSecond.eliminateName:
        return Eliminate
    }
  }
  return {
    ...r,
    Component: ParseComp(r.name),
    exact: false
  }
})
