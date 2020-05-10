import React from 'react'
import { Route, Router, Switch } from 'react-router-dom'

import { history } from 'utils/history'
import { Overview } from 'pages/overview'
import { Register } from 'pages/register'
import { Login } from 'pages/login'
import { StateProvider } from 'store/store'

export const App = () => (
  <>
    <StateProvider>
      <Router history={history}>
        <Switch>
          <Route exact path="/overview" component={Overview} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
        </Switch>
      </Router>
    </StateProvider>
  </>
)
