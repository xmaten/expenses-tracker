import { AxiosResponse } from 'axios'

import httpClient from 'utils/httpClient'

import { NewExpense } from './expenses.model'

const url = '/expenses'

export const ExpensesApi = {
  getExpenses(): Promise<AxiosResponse> {
    return httpClient.get(url)
  },
  addExpenses(newExpense: NewExpense): Promise<AxiosResponse> {
    return httpClient.post(url, newExpense)
  },
}
