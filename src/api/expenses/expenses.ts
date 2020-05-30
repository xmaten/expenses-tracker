import { AxiosResponse } from 'axios'

import httpClient from 'utils/httpClient'

import { Expense, NewExpense } from './expenses.model'

const url = '/expenses'

export const ExpensesApi = {
  getExpenses(): Promise<AxiosResponse<any>> {
    return httpClient.get(url)
  },
  addExpenses(newExpense: NewExpense): Promise<AxiosResponse<any>> {
    return httpClient.post(url, newExpense)
  },
}
