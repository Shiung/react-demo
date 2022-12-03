import { useMemo, useEffect } from 'react'
import { useSelector } from "react-redux"
import { useLocation, Switch, Route, Redirect } from 'react-router-dom'
import { routes } from './router'
import { history } from '@/sports/utils'

const Vote = () => {
  const token = useSelector<any, string>(store => store.user.info.token)
  const location = useLocation()
  const redirectPath = useMemo(() => routes[0], [])
  const { pathname } = location
  useEffect(() => {
    window.scroll(0, 0)
  }, [pathname])

  useEffect(() => {
    if (!token) history.replace('/')
  }, [token])
  return (
    <>
      <Switch location={location}>
        {useMemo(() => {
          return routes.map(({ path, exact, Component }) => (
            <Route key={path} exact={!!exact} path={path}>
              <Component />
            </Route>
          ))
        }, [])}
        <Route path='*' key={`redirect-${redirectPath.path}`}>
          <Redirect to={redirectPath.path}/>
        </Route>
      </Switch>
    </>
  )
}

export default Vote
