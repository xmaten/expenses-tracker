import { AxiosResponse } from 'axios'

import httpClient from 'utils/httpClient'

import { NewIncome } from './incomes.model'

const url = '/incomes'

export const IncomesApi = {
  getIncomes(): Promise<AxiosResponse> {
    return httpClient.get(url)
  },
  addIncome(newIncome: NewIncome): Promise<AxiosResponse> {
    return httpClient.post(url, newIncome)
  },
}
