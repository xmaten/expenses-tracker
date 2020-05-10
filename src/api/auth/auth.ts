import { AxiosResponse } from 'axios'

import httpClient from 'utils/httpClient'

import { RegisterFormaData, LoginFormData } from './auth.model'

export const AuthApi = {
  register(registerFormData: RegisterFormaData): Promise<AxiosResponse> {
    return httpClient.post('/users', registerFormData)
  },
  login(loginFormData: LoginFormData): Promise<AxiosResponse> {
    return httpClient.post('/login', loginFormData)
  },
}
