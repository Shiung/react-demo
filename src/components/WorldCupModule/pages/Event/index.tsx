import { useMemo } from 'react'
// import { useSelector } from 'react-redux'
import { useLocation, Switch, Route, Redirect } from 'react-router-dom'

import { PageNameEventSecond } from '../../constants' //'@sport/components/WorldCupModule/constants'
import { routes } from './router'
import * as EventNav from '../../components/EventNav' //'@sport/components/WorldCupModule/components/EventNav'
import * as EventLayout from '../../Layout/Event'
import WorldCupContextProvider from '../../store/WorldCupContext' // '@sport/components/WorldCupModule/store/WorldCupContext'
import StreamContextProvider from '../../store/StreamContext' //'@sport/components/WorldCupModule/store/StreamContext'

const Event = () => {
  const location = useLocation()
  // const language = useSelector((state: any) => state.common.language)
  const redirectPath = useMemo(() => routes[0], [])
  const navList = useMemo(() => routes.filter(({ navUse }) => navUse), [])
  return (
    <WorldCupContextProvider>
      <StreamContextProvider>
        <EventLayout.Main
          // key={language}
          isVotePage={location.pathname.includes(PageNameEventSecond.voteResult)}
          MainNav={<EventNav.MainNav routes={navList} lang={'zh_CN'} />}>
          <Switch location={location}>
            {routes.map(({ path, exact, Component }) => {
              return (
                <Route key={path} exact={exact} path={path} >
                  <Component />
                </Route>
              )
            })}
            <Route path='*' key={`redirect-${redirectPath.path}`}>
              <Redirect to={redirectPath.path} />
            </Route>
          </Switch>
        </EventLayout.Main>
      </StreamContextProvider>
    </WorldCupContextProvider>
  )

}

export default Event
