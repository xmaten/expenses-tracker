import { Dispatch } from 'react'
import { ExpensesApi } from 'api/expenses/expenses'
import { RevenuesApi } from 'api/revenues/revenues'
import { ActionTypes } from './actionTypes'
import { mergeDataWithId } from '../utils/mergeDataWithId'

export const getExpenses = async (dispatch?: Dispatch<any>) => {
  dispatch && dispatch({ type: ActionTypes.GET_DATA_START })

  try {
    const { data } = await ExpensesApi.getExpenses()
    const dataWithId = mergeDataWithId(data)

    dispatch && dispatch({ type: ActionTypes.GET_EXPENSES, payload: dataWithId })
  } catch {
    dispatch && dispatch({ type: ActionTypes.GET_DATA_ERROR })
  }
}

export const getRevenues = async (dispatch?: Dispatch<any>) => {
  dispatch && dispatch({ type: ActionTypes.GET_DATA_START })
  try {
    const { data } = await RevenuesApi.getRevenues()
    const dataWithId = mergeDataWithId(data)

    dispatch && dispatch({ type: ActionTypes.GET_REVENUES, payload: dataWithId })
  } catch {
    dispatch && dispatch({ type: ActionTypes.GET_DATA_ERROR })
  }
}
