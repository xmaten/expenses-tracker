import React, { ReactElement } from 'react'
import { Router } from 'react-router-dom'
import { render, RenderOptions } from '@testing-library/react'

import { history } from 'utils/history'

export const renderWithRouter = (ui: ReactElement, renderOptions?: RenderOptions) => {
  const Wrapper: React.FC = ({ children }) => {
    return <Router history={history}>{children}</Router>
  }
  return render(ui, { wrapper: Wrapper, ...renderOptions })
}
