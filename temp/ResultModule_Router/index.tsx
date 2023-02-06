import { useMemo } from 'react'
import { useLocation, Switch, Route, Redirect } from 'react-router-dom'
import LeagueContextProvider from '@/components/ResultModule/store/league-context'
import { CATEGORIES, SPORTS } from '@/constants/common'
import { MOBILE_ROUTE_LIST_CHILDREN } from '@route/mobileRoute'

const Result = () => {
  const location = useLocation()
  return (
    <LeagueContextProvider>
      <Switch location={location}>
        {useMemo(() => {
          return MOBILE_ROUTE_LIST_CHILDREN[CATEGORIES.GAMERESULT].map((route) => {
            return (
              <Route
                key={route.path}
                exact={!!route.exact}
                path={route.path}
                component={route.component} />)
          })
        }, [])}
        <Route path='*' key={`/${CATEGORIES.GAMERESULT}/${SPORTS.FOOTBALL}/regular/today`}>
          <Redirect to={`/${CATEGORIES.GAMERESULT}/${SPORTS.FOOTBALL}/regular/today`} />
        </Route>
      </Switch>
    </LeagueContextProvider>
  )
}

export default Result
