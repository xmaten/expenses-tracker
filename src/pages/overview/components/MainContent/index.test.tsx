import React from 'react'

import { renderWithRouter } from 'utils/testUtils/renderWithRouter'

import { MainContent } from './index'

jest.mock('api/expenses/expenses')

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

describe('Main content component', () => {
  test('It should display zero as expenses, incomes and total on init', () => {
    const { getByTestId } = renderWithRouter(<MainContent />)

    const expenses = getByTestId('expenses-val')
    const incomes = getByTestId('incomes-val')
    const total = getByTestId('total-val')

    expect(expenses.textContent).toEqual(`- 0`)
    expect(incomes.textContent).toEqual('0')
    expect(total.textContent).toEqual('0')
  })
})
