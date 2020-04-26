import 'jest-canvas-mock'
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

test('Shows loader', async () => {
  const { getByTestId } = renderWithRouter(<Overview />)
  const spinner = getByTestId('overview-spinner')
  console.log(spinner)
  expect(spinner).toBeDefined()
})
