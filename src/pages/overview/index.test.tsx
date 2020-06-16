import React from 'react'

import { renderWithRouter } from 'utils/testUtils/renderWithRouter'
import * as ExpensesApi from 'api/expenses/expenses'
import * as IncomesApi from 'api/incomes/incomes'

import { Overview } from './index'

jest.mock('api/expenses/expenses')
jest.mock('api/incomes/incomes')

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

describe('Overview component', () => {
  test('It should fetch data', async () => {
    const mockGetExpenses = jest.spyOn(ExpensesApi, 'getExpenses')
    const mockGetIncomes = jest.spyOn(IncomesApi, 'getIncomes')

    renderWithRouter(<Overview />)

    expect(mockGetExpenses).toHaveBeenCalledTimes(1)
    expect(mockGetIncomes).toHaveBeenCalledTimes(1)
  })
})
