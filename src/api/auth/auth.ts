import { AxiosResponse } from 'axios'

import httpClient from 'utils/httpClient'

import { RegisterFormaData, LoginFormData, LoginResponse } from './auth.model'

export const AuthApi = {
  register(registerFormData: RegisterFormaData): Promise<AxiosResponse> {
    return httpClient.post('/users', registerFormData)
  },
  login(loginFormData: LoginFormData): Promise<LoginResponse> {
    return httpClient.post('/login', loginFormData)
  },
}
