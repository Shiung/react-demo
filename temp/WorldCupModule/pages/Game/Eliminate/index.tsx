import { useMemo, Suspense, useEffect } from 'react'
import { useLocation, Switch, Route, Redirect } from 'react-router-dom'
import { routes } from './router'

import EliminateContextProvider from '@sport/components/WorldCupModule/store/EliminateContext'

const Eliminate = () => {
  const location = useLocation()
  const redirectPath = useMemo(() => routes[0], [])
  useEffect(() => {
    window.scroll(0, 0)
  }, [location.pathname])
  return (
    <EliminateContextProvider>
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
    </EliminateContextProvider>
  )  
}

export default Eliminate
