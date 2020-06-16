import { AxiosResponse } from 'axios'

import httpClient from 'utils/httpClient'

import { NewIncome } from './incomes.model'

const url = '/incomes'

export const getIncomes = () => {
  return httpClient.get(url)
}

export const addIncome = (newIncome: NewIncome) => {
  return httpClient.post(url, newIncome)
}
