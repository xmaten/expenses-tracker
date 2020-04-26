import 'jest-canvas-mock'
import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { MainContent } from './MainContent'
import { renderWithRouter } from 'utils/testUtils/renderWithRouter'
import { fireEvent } from '@testing-library/react'

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

test('Shows modal on button click', () => {
  const { getByTestId } = renderWithRouter(<MainContent />)

  const addNewButton = getByTestId('add-new-button')
  fireEvent.click(addNewButton)

  const addNewModal = getByTestId('add-new-modal')
  expect(addNewModal).toBeDefined()
})
