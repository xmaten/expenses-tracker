import { AxiosResponse } from 'axios'

import httpClient from 'utils/httpClient'

import { Income, NewIncome } from './incomes.model'

const url = '/revenues.json'

export const IncomesApi = {
  getIncomes(): Promise<AxiosResponse<Income[]>> {
    return httpClient.get(url)
  },
  addIncome(newIncome: NewIncome): Promise<AxiosResponse<any>> {
    return httpClient.patch(url, newIncome)
  },
}
