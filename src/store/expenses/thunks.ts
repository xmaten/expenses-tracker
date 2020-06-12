import { Dispatch } from 'react'

import { ExpensesApi } from 'api/expenses/expenses'
import { NewExpense } from 'api/expenses/expenses.model'
import { SharedActionTypes } from 'store/shared/actionTypes'

import { ExpensesActionTypes } from './actionTypes'

export const getExpenses = async (dispatch: Dispatch<any>) => {
  dispatch({ type: SharedActionTypes.GET_DATA_START })

  try {
    const {
      data: { response },
    } = await ExpensesApi.getExpenses()

    dispatch({ type: ExpensesActionTypes.GET_EXPENSES, payload: response })
  } catch {
    dispatch({ type: SharedActionTypes.GET_DATA_ERROR })
  }
}

export const addExpense = async (expenseData: NewExpense, dispatch: Dispatch<any>) => {
  dispatch({ type: SharedActionTypes.UPDATE_DATA_START })

  try {
    await ExpensesApi.addExpenses(expenseData)

    dispatch({ type: SharedActionTypes.UPDATE_DATA_SUCCESS })

    await getExpenses(dispatch)
  } catch {
    dispatch({ type: SharedActionTypes.UPDATE_DATA_FAIL })
  }
}
