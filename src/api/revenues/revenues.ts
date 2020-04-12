import { AxiosResponse } from 'axios'

import httpClient from 'utils/httpClient'

import { Revenue, NewRevenue } from './revenues.model'

const url = '/revenues.json'

export const RevenuesApi = {
  getRevenues(): Promise<AxiosResponse<Revenue[]>> {
    return httpClient.get(url)
  },
  addReveune(newRevenue: NewRevenue): Promise<AxiosResponse<any>> {
    return httpClient.put(url, newRevenue)
  },
}
