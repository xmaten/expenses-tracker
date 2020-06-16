import { AxiosResponse } from 'axios'

import httpClient from 'utils/httpClient'

import { NewIncome } from './incomes.model'

const url = '/incomes'

export const getIncomes = (): Promise<AxiosResponse> => {
  return httpClient.get(url)
}

export const addIncome = (newIncome: NewIncome): Promise<AxiosResponse> => {
  return httpClient.post(url, newIncome)
}
