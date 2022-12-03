import { useMemo } from 'react'
import { useLocation, Switch, Route, Redirect } from 'react-router-dom'
import { routes } from './router'

import PreGameContextProvider from '@sport/components/WorldCupModule/store/PreGameContext'

const PreGame = () => {
  const location = useLocation()
  const redirectPath = useMemo(() => routes[0], [])
  return (
    <PreGameContextProvider>
      <Switch location={location}>
        {useMemo(() => {
          return routes.map((route) =>
            <Route key={route.path} path={route.path} exact component={route.Component}/>)
        }, [])}
        <Route path='*' key={`redirect-${redirectPath.path}`}>
          <Redirect to={redirectPath.path} />
        </Route>
      </Switch>
    </PreGameContextProvider>
  )
}

export default PreGame
