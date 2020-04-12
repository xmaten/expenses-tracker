import { AxiosResponse } from 'axios'

import httpClient from 'utils/httpClient'

import { Revenue } from './revenues.model'

export const RevenuesApi = {
  getRevenues(): Promise<AxiosResponse<Revenue[]>> {
    const url = '/revenues.json'

    return httpClient.get(url)
  },
}
