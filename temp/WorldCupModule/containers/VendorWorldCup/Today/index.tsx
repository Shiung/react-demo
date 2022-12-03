import { useLocation, Switch, Route } from 'react-router-dom'
import League from '../common/League'
import Simple from './Simple'
import { worldCupBallName } from '@sport/components/WorldCupModule/constants'
import SelectorContextProvider from '../common/League/store/selector-context'

const WorldCupToday = () => {
  const location = useLocation()

  return (
    <SelectorContextProvider limit={8}>
      <Switch location={location}>
        <Route exact path={`/:category/${worldCupBallName}`}>
          <League />
        </Route>
        <Route exact path={`/:category/${worldCupBallName}/:group`}>
          <Simple />
        </Route>
      </Switch>
    </SelectorContextProvider>
  )
}

export default WorldCupToday
