import React, { useEffect } from 'react'
import { Route, Router, Switch } from 'react-router-dom'

import { history } from 'utils/history'
import { Overview } from 'pages/overview'
import { Register } from 'pages/register'
import { Login } from 'pages/login'
import { StateProvider } from 'store/store'
import { PrivateRoute } from 'components/layout/PrivateRoute'
import { getFromStorage } from 'utils/localStorage'

export const App = () => {
  useEffect(() => {
    if (getFromStorage('access-token')) {
      history.push('/overview')
    } else {
      history.push('/login')
    }
  }, [])

  return (
    <StateProvider>
      <Router history={history}>
        <Switch>
          <PrivateRoute exact path="/overview">
            <Overview />
          </PrivateRoute>
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
        </Switch>
      </Router>
    </StateProvider>
  )
}
