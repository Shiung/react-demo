import { RouterPathConf, PageNameThird } from '@sport/components/WorldCupModule/constants'
import Schedule from './Schedule'
import Groupping from './Groupping'

export const routes = RouterPathConf.event.info.children[0].children.map((r) => {
  const ParseComp = (name: PageNameThird) => {
    switch (name) {
      case PageNameThird.scheduleName:
        return Schedule
      case PageNameThird.grouppingName:
        return Groupping
    }
  }
  return {
    ...r,
    Component: ParseComp(r.name),
    exact: true
  }
})
