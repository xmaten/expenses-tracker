import { AxiosResponse } from 'axios'

import httpClient from 'utils/httpClient'

import { Expense } from './expenses.model'

export const ExpensesApi = {
  getExpenses(): Promise<AxiosResponse<Expense[]>> {
    const url = '/expenses.json'

    return httpClient.get(url)
  },
}
