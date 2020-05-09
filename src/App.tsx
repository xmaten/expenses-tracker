import React from 'react'
import { Route, Router, Switch } from 'react-router-dom'

import { history } from 'utils/history'
import { Overview } from 'pages/overview'
import { Register } from 'pages/register'
import { StateProvider } from 'store/store'

export const App = () => (
  <>
    <StateProvider>
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={Overview} />
          <Route path="/register" component={Register} />
        </Switch>
      </Router>
    </StateProvider>
  </>
)
