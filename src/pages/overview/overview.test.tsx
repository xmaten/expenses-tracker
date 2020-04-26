import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { Overview } from '../Overview'
import { renderWithRouter } from 'utils/testUtils/renderWithRouter'

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

test('Shows loader', () => {
  const { queryByTestId } = renderWithRouter(<Overview />)

  expect(queryByTestId('overview-spinner')).toBeNull()
})
