import { AxiosResponse } from 'axios'

import httpClient from 'utils/httpClient'

import { RegisterFormaData } from './auth.model'

export const AuthApi = {
  register(registerFormData: RegisterFormaData): Promise<AxiosResponse> {
    return httpClient.post('/users', registerFormData)
  },
}
