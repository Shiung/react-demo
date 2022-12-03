import { RouterPathConf, PageNameThird } from '@sport/components/WorldCupModule/constants'
import Schedule from './Schedule'
import Groupping from './Groupping'
import Chart from './Chart'

export const routes = RouterPathConf.event.info.children[1].children.map((r) => {
  const ParseComp = (name: PageNameThird) => {
    switch (name) {
      case PageNameThird.scheduleName:
        return Schedule
      case PageNameThird.grouppingName:
        return Groupping
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
