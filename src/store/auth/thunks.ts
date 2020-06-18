import { Dispatch } from 'react'

import { LoginFormData, RegisterFormaData } from 'api/auth/auth.model'
import * as AuthApi from 'api/auth/auth'
import { saveToStorage } from 'utils/localStorage'
import { history } from 'utils/history'

import { AuthActionTypes } from './actionTypes'

export const registerUser = async (
  registerFormData: RegisterFormaData,
  dispatch: Dispatch<any>,
) => {
  dispatch({ type: AuthActionTypes.REGISTER_START })

  try {
    await AuthApi.register(registerFormData)

    dispatch({ type: AuthActionTypes.REGISTER_SUCCESS })
    history.push('/login?initialLogin=true')
  } catch (e) {
    let errorMessage = null
    console.log(e)
    if (e.data?.error?.Taken_username) {
      errorMessage = 'takenUsername'
    }

    if (e.data?.error?.Taken_email) {
      errorMessage = 'takenEmail'
    }

    dispatch({ type: AuthActionTypes.REGISTER_FAIL, payload: errorMessage })
  }
}

export const loginUser = async (loginFormData: LoginFormData, dispatch: Dispatch<any>) => {
  dispatch({ type: AuthActionTypes.LOGIN_START })

  try {
    const {
      data: { response },
    } = await AuthApi.login(loginFormData)

    saveToStorage('access-token', response.token)
    dispatch({ type: AuthActionTypes.LOGIN_SUCCESS })
    history.push('/overview')
  } catch (e) {
    let errorMessage = null

    if (e.data?.error?.Incorrect_password) {
      errorMessage = 'wrongCredentials'
    }

    if (e.data?.error?.Invalid_email) {
      errorMessage = 'invalidEmail'
    }

    dispatch({ type: AuthActionTypes.LOGIN_FAIL, payload: errorMessage })
  }
}
