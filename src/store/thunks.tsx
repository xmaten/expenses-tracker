import { Dispatch } from 'react'

import { ExpensesApi } from 'api/expenses/expenses'
import { RevenuesApi } from 'api/revenues/revenues'

import { ActionTypes } from './actionTypes'
import { mergeDataWithId } from '../utils/mergeDataWithId'
import { NewExpense } from '../api/expenses/expenses.model'
import { NewRevenue } from '../api/revenues/revenues.model'

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

export const getRevenues = async (dispatch: Dispatch<any>) => {
  dispatch({ type: ActionTypes.GET_DATA_START })
  try {
    const { data } = await RevenuesApi.getRevenues()
    const dataWithId = mergeDataWithId(data)

    dispatch({ type: ActionTypes.GET_REVENUES, payload: dataWithId })
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

export const addRevenue = async (revenueData: NewRevenue, dispatch: Dispatch<any>) => {
  dispatch({ type: ActionTypes.UPDATE_DATA_START })

  try {
    await RevenuesApi.addReveune(revenueData)

    dispatch({ type: ActionTypes.UPDATE_DATA_SUCCESS })

    await getRevenues(dispatch)
  } catch {
    dispatch({ type: ActionTypes.UPDATE_DATA_FAIL })
  }
}
