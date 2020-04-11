import { AxiosResponse } from 'axios'

import httpClient from 'utils/httpClient'

export const ExpensesApi = {
  getExpenses(): Promise<AxiosResponse<any>> {
    const url = '/expenses.json'

    return httpClient.get(url)
  },
}
