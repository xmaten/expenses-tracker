import React from 'react'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import { render } from '@testing-library/react'

interface RenderWithRouterArgs {
  route: string
  history: any
}

export function renderWithRouter(
  ui: any,
  {
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] }),
  } = {} as RenderWithRouterArgs,
) {
  const Wrapper = ({ children }: any) => <Router history={history}>{children}</Router>

  if (ui) {
    return {
      ...render(ui, { wrapper: Wrapper }),
      history,
    }
  }
}
