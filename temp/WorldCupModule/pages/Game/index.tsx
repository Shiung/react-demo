import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, Switch, Route, Redirect } from 'react-router-dom'
import NavHeader from '@sport/components/WorldCupModule/components/NavHeader'

import WorldCupContextProvider from '@sport/components/WorldCupModule/store/WorldCupContext'
import { eliminateStartTime } from '@sport/components/WorldCupModule/constants'

import * as Layout from '../../Layout'
import { routes } from './router'

const Game = () => {
  const location = useLocation()
  const language = useSelector((state: any) => state.common.language)
  const redirectPath = useMemo(() => {
    const currentTime = new Date().getTime()
    return (currentTime > eliminateStartTime)
      ? routes[2]
      : routes[1]
  }, [])
  return (
    <WorldCupContextProvider key={language}>
      <Switch location={location}>
        {useMemo(() => {
          return routes.map(({ path, exact, Component, children }) => {
            return (
              <Route key={path} exact={!!exact} path={path}>
                <Layout.Main
                  header={<NavHeader />}
                  subHeader={<NavHeader.Menu routeChildren={children} />}>
                  <Component />
                </Layout.Main>
              </Route>)
          })
        }, [])}
        <Route path='*' key={`redirect-${redirectPath.path}`}>
          <Layout.Main
            header={<NavHeader />}
            subHeader={<NavHeader.Menu routeChildren={redirectPath.children} />}>
            <Redirect to={redirectPath.path}/>
            </Layout.Main>
        </Route>
      </Switch>
    </WorldCupContextProvider>
  )
}

export default Game
