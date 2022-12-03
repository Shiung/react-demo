import { RouterPathConf, PageNameThird } from '../../../../constants' //'@sport/components/WorldCupModule/constants'
import Schedule from './Schedule'
import Chart from './Chart'


export const routes = RouterPathConf.event.info.children[2].children.map((r) => {
  const ParseComp = (name: PageNameThird) => {
    switch (name) {
      case PageNameThird.scheduleName:
        return Schedule
      case PageNameThird.chartName:
        return Chart
    }
  }
  return {
    ...r,
    Component: ParseComp(r.name),
    exact: true
  }
})
