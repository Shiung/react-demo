import { useMemo, Suspense, useEffect } from 'react'
import { useLocation, Switch, Route, Redirect } from 'react-router-dom'
import { routes } from './router'

import GroupRoundContextProvider from '../../../store/GroupRoundContext' //'@sport/components/WorldCupModule/store/GroupRoundContext'

const GroupGame = () => {
  const location = useLocation()
  const redirectPath = useMemo(() => routes[0], [])
  useEffect(() => {
    window.scroll(0, 0)
  }, [location.pathname])
  return (
    <GroupRoundContextProvider>
      <Suspense fallback={<>lodding...</>}>
        <Switch location={location}>
          {useMemo(() => {
            return routes.map((route) =>
              <Route key={route.path} path={route.path} exact component={route.Component}/>)
          }, [])}
          <Route path='*' key={`redirect-${redirectPath.path}`}>
            <Redirect to={redirectPath.path} />
          </Route>
        </Switch>
      </Suspense>
    </GroupRoundContextProvider>
  )
}

export default GroupGame
