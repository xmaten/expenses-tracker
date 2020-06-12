import { Dispatch } from 'react'

import { ExpensesApi } from 'api/expenses/expenses'
import { IncomesApi } from 'api/incomes/incomes'
import { NewExpense } from 'api/expenses/expenses.model'
import { NewIncome } from 'api/incomes/incomes.model'
import { AuthApi } from 'api/auth/auth'
import { LoginFormData, RegisterFormaData } from 'api/auth/auth.model'
import { saveToStorage } from 'utils/localStorage'

import { ActionTypes } from './actionTypes'

export const getExpenses = async (dispatch: Dispatch<any>) => {
  dispatch({ type: ActionTypes.GET_DATA_START })

  try {
    const {
      data: { response },
    } = await ExpensesApi.getExpenses()

    dispatch({ type: ActionTypes.GET_EXPENSES, payload: response })
  } catch {
    dispatch({ type: ActionTypes.GET_DATA_ERROR })
  }
}

export const getIncomes = async (dispatch: Dispatch<any>) => {
  dispatch({ type: ActionTypes.GET_DATA_START })
  try {
    const {
      data: { response },
    } = await IncomesApi.getIncomes()

    dispatch({ type: ActionTypes.GET_INCOMES, payload: response })
  } catch {
    dispatch({ type: ActionTypes.GET_DATA_ERROR })
  }
}

export const addExpense = async (expenseData: NewExpense, dispatch: Dispatch<any>) => {
  dispatch({ type: ActionTypes.UPDATE_DATA_START })

  try {
    await ExpensesApi.addExpenses(expenseData)

    dispatch({ type: ActionTypes.UPDATE_DATA_SUCCESS })

    await getExpenses(dispatch)
  } catch {
    dispatch({ type: ActionTypes.UPDATE_DATA_FAIL })
  }
}

export const addIncome = async (incomeData: NewIncome, dispatch: Dispatch<any>) => {
  dispatch({ type: ActionTypes.UPDATE_DATA_START })

  try {
    await IncomesApi.addIncome(incomeData)

    dispatch({ type: ActionTypes.UPDATE_DATA_SUCCESS })

    await getIncomes(dispatch)
  } catch {
    dispatch({ type: ActionTypes.UPDATE_DATA_FAIL })
  }
}

export const registerUser = async (
  registerFormData: RegisterFormaData,
  dispatch: Dispatch<any>,
) => {
  dispatch({ type: ActionTypes.REGISTER_START })

  try {
    await AuthApi.register(registerFormData)

    dispatch({ type: ActionTypes.REGISTER_SUCCESS })
  } catch {
    dispatch({ type: ActionTypes.REGISTER_FAIL })
  }
}

export const loginUser = async (loginFormData: LoginFormData, dispatch: Dispatch<any>) => {
  dispatch({ type: ActionTypes.LOGIN_START })

  try {
    const {
      data: { response },
    } = await AuthApi.login(loginFormData)

    saveToStorage('access-token', response.token)
    dispatch({ type: ActionTypes.LOGIN_SUCCESS })
  } catch (e) {
    dispatch({ type: ActionTypes.LOGIN_FAIL })
  }
}
