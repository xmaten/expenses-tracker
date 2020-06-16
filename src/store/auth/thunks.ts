import { Dispatch } from 'react'

import { LoginFormData, RegisterFormaData } from 'api/auth/auth.model'
import * as AuthApi from 'api/auth/auth'
import { saveToStorage } from 'utils/localStorage'
import { AuthActionTypes } from './actionTypes'

export const registerUser = async (
  registerFormData: RegisterFormaData,
  dispatch: Dispatch<any>,
) => {
  dispatch({ type: AuthActionTypes.REGISTER_START })

  try {
    await AuthApi.register(registerFormData)

    dispatch({ type: AuthActionTypes.REGISTER_SUCCESS })
  } catch {
    dispatch({ type: AuthActionTypes.REGISTER_FAIL })
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
  } catch (e) {
    dispatch({ type: AuthActionTypes.LOGIN_FAIL })
  }
}
