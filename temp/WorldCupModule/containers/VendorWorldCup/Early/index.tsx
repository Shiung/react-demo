import { useLocation, Switch, Route } from 'react-router-dom'
import League from '../common/League'
import Simple from './Simple'
import Transient from '../common/League/Transient'
import { worldCupBallName } from '@sport/components/WorldCupModule/constants'
import SelectorContextProvider from '../common/League/store/selector-context'
import DateListContextProvider from '../common/League/store/dateList-context'

const WorldCupEarly = () => {
  const location = useLocation()

  return (
    <DateListContextProvider>
      <SelectorContextProvider limit={8}>
        <Switch location={location}>
          <Route exact path={`/:category/${worldCupBallName}/interval/next`}>
            <Transient />
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
