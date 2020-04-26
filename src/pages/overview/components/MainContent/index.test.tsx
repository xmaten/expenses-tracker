import 'jest-canvas-mock'
import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { calculateExpenses, calculateIncomes, calculateTotal, MainContent } from './index'
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

test('It calculates expenses', () => {
  const data = [
    {
      name: '',
      date: '',
      category: '',
      value: 100,
    },
    {
      name: '',
      date: '',
      category: '',
      value: 200,
    },
  ]

  const expenses = calculateExpenses(data)

  expect(expenses).toEqual(300)
})

test('It calculates incomes', () => {
  const data = [
    {
      name: '',
      date: '',
      category: '',
      value: 100,
    },
    {
      name: '',
      date: '',
      category: '',
      value: 200,
    },
  ]

  const incomes = calculateIncomes(data)

  expect(incomes).toEqual(300)
})

test('It calculates total', () => {
  const EXPENSES = 5000
  const INCOMES = 4000

  const total = calculateTotal(EXPENSES, INCOMES)

  expect(total).toEqual(-1000)
})
