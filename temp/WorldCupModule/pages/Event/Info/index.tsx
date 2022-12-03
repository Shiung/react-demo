import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, Switch, Route, Redirect } from 'react-router-dom'
import * as EventLayout from '@sport/components/WorldCupModule/Layout/Event'
import * as EventNav from '@sport/components/WorldCupModule/components/EventNav'
import { eliminateStartTime } from '@sport/components/WorldCupModule/constants'
import { useWorldCupContext } from '@sport/components/WorldCupModule/store/WorldCupContext'
import { routes } from './router'

const Info = () => {
  const location = useLocation()
  const language = useSelector((state: any) => state.common.language)
  const { servertimeDiff } = useWorldCupContext()
  const redirectPath = useMemo(() => {
    const currentTime = new Date().getTime() + servertimeDiff
    return (currentTime > eliminateStartTime)
      ? routes[2] /** 預設淘汰賽 */
      : routes[1] /** 預設分組賽 */
  }, [servertimeDiff])
  return (
    <EventLayout.Second titleI18n='worldCup.gameInfoTitle' lang={language}>
      <Switch location={location}>
        {useMemo(() => {
          return routes.map(({ path, exact, Component, children }) => (
            <Route key={path} exact={!!exact} path={path}>
              <EventLayout.Info
                infoNav={<EventNav.InfoNav routes={routes} />}
                infoSubNav={<EventNav.InfoSubNav routes={children} />}>
                <Component />
              </EventLayout.Info>
            </Route>
          ))
        }, [])}
        <Route path='*' key={`redirect-${redirectPath.path}`}>
          <Redirect to={redirectPath.path}/>
        </Route>
      </Switch>
    </EventLayout.Second>
  )
}

export default Info
