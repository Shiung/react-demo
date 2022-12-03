import { useLocation, Switch, Route } from 'react-router-dom'
import { CATEGORIES } from '@sport/constants/common'
import Inplay from '../Inplay'
import Incoming from '../Incoming'
import League from '../common/League'
import Simple from './Simple'
import OutrightSimple from '../Outright/Simple'
import { worldCupBallName } from '@sport/components/WorldCupModule/constants'
import SelectorContextProvider from '../common/League/store/selector-context'
import DateListContextProvider from '../common/League/store/dateList-context'

const WorldCupEarly = () => {
  const location = useLocation()

  return (
    <DateListContextProvider>
      <SelectorContextProvider limit={8}>
        <Switch location={location}>
          <Route exact path={`/:category/${worldCupBallName}/interval/${CATEGORIES.INPLAY}`}>
            <Inplay />
          </Route>
          <Route exact path={`/:category/${worldCupBallName}/interval/${CATEGORIES.INCOMING}`}>
            <Incoming />
          </Route>
          <Route exact path={`/:category/${worldCupBallName}/interval/${CATEGORIES.OUTRIGHT}`}>
            <OutrightSimple />
          </Route>
          <Route exact path={`/:category/${worldCupBallName}/interval/:interval`}>
            <League />
          </Route>
          <Route exact path={`/:category/${worldCupBallName}/interval/:interval/:group`}>
            <Simple />
          </Route>
        </Switch>
      </SelectorContextProvider>
    </DateListContextProvider>
  )
}

export default WorldCupEarly
