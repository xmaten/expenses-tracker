import React from 'react'
import { Redirect, Route, RouteProps } from 'react-router-dom'

import { getFromStorage } from 'utils/localStorage'

interface Props extends RouteProps {}

export const PrivateRoute: React.FC<Props> = ({ children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        getFromStorage('access-token') ? (
          <>{children}</>
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )
      }
    />
  )
}
