import React, { Suspense, useEffect } from 'react'
import { Router, Switch, Redirect, Route } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import './App.css';
import { routerConf } from './router'

const versionInfo = () => {
  window.versionInfo = {
    // version: process.env.VERSION,
    commitHEAD: process.env.commitHEAD,
  }
}

function App() {
  const history = createBrowserHistory()
  useEffect(() => versionInfo(), [])
  return (
    <div>
      <Router history={history} >
        <Suspense fallback={<></>}>
          <Switch>
            {routerConf.map(({ path, Component, exact }) => {
              return (
                <Route
                  key={path}
                  path={path}
                  component={Component}
                  exact={exact}/>
              )
            })}
            <Route path='*'>
              <Redirect to={routerConf[0].path} />
            </Route>
          </Switch>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
