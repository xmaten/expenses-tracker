import { AxiosResponse } from 'axios'

import httpClient from 'utils/httpClient'

import { Income, NewIncome } from './incomes.model'

const url = '/incomes'

export const IncomesApi = {
  getIncomes(): Promise<AxiosResponse<any>> {
    return httpClient.get(url)
  },
  addIncome(newIncome: NewIncome): Promise<AxiosResponse<any>> {
    return httpClient.post(url, newIncome)
  },
}
