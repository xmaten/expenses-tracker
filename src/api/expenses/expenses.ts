import httpClient from 'utils/httpClient'

import { NewExpense } from './expenses.model'

const url = '/expenses'

export const getExpenses = () => {
  return httpClient.get(url)
}

export const addExpenses = (newExpense: NewExpense) => {
  return httpClient.post(url, newExpense)
}
