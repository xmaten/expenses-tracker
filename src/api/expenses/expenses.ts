import { AxiosResponse } from 'axios'

import httpClient from 'utils/httpClient'

import { NewExpense } from './expenses.model'

const url = '/expenses'

export const getExpenses = (): any => {
  return httpClient.get(url)
}

export const addExpenses = (newExpense: NewExpense): Promise<AxiosResponse> => {
  return httpClient.post(url, newExpense)
}
