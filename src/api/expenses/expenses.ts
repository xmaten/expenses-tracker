import { AxiosResponse } from 'axios'

import httpClient from 'utils/httpClient'

import { Expense, NewExpense } from './expenses.model'

const url = '/expenses.json'

export const ExpensesApi = {
  getExpenses(): Promise<AxiosResponse<Expense[]>> {
    return httpClient.get(url)
  },
  addExpenses(newExpense: NewExpense): Promise<AxiosResponse<any>> {
    return httpClient.put(url, newExpense)
  },
}
