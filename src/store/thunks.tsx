import { Dispatch } from 'react'

import { ExpensesApi } from 'api/expenses/expenses'
import { IncomesApi } from 'api/incomes/incomes'
import { mergeDataWithId } from 'utils/mergeDataWithId'
import { NewExpense } from 'api/expenses/expenses.model'
import { NewIncome } from 'api/incomes/incomes.model'
import { AuthApi } from 'api/auth/auth'
import { RegisterFormaData } from 'api/auth/auth.model'

import { ActionTypes } from './actionTypes'

export const getExpenses = async (dispatch: Dispatch<any>) => {
  dispatch({ type: ActionTypes.GET_DATA_START })

  try {
    const { data } = await ExpensesApi.getExpenses()
    const dataWithId = mergeDataWithId(data)

    dispatch({ type: ActionTypes.GET_EXPENSES, payload: dataWithId })
  } catch {
    dispatch({ type: ActionTypes.GET_DATA_ERROR })
  }
}

export const getIncomes = async (dispatch: Dispatch<any>) => {
  dispatch({ type: ActionTypes.GET_DATA_START })
  try {
    const { data } = await IncomesApi.getIncomes()
    const dataWithId = mergeDataWithId(data)

    dispatch({ type: ActionTypes.GET_INCOMES, payload: dataWithId })
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
