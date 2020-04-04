import React from "react";
import { Route, Router, Switch } from "react-router-dom";

import { history } from "utils/history";
import { Overview } from "pages/Overview";

export const App = () => (
  <>
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={Overview} />
      </Switch>
    </Router>
  </>
);
