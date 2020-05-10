import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

import { getFromStorage, removeFromStorage } from './localStorage'

export function setRequestAuthHeaders(headers: { [key: string]: string }) {
  const value = getFromStorage('access-token')

  if (value) {
    headers['Authorization'] = `Bearer ${value}`
  }
}

export function onRequest(config: AxiosRequestConfig): AxiosRequestConfig {
  setRequestAuthHeaders(config.headers)

  return config
}

function onResponseSuccess(response: AxiosResponse): AxiosResponse {
  return response
}

export function onResponseError(error: AxiosError): Promise<never> {
  if (error.response?.status === 401 && window.location.pathname.indexOf('login') === -1) {
    removeFromStorage('access-token')
    window.location.reload()
  }

  return Promise.reject(error.response)
}

function httpClient(): AxiosInstance {
  const defaultOptions = {
    baseURL: process.env.REACT_APP_API_URL || '',
  }

  const instance = axios.create(defaultOptions)

  instance.interceptors.request.use(onRequest)
  instance.interceptors.response.use(onResponseSuccess, onResponseError)

  return instance
}

export default httpClient()
