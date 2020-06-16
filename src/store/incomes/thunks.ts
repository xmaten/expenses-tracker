import { Dispatch } from 'react'

import * as IncomesApi from 'api/incomes/incomes'
import { NewIncome } from 'api/incomes/incomes.model'
import { SharedActionTypes } from 'store/shared/actionTypes'

import { IncomesActionTypes } from './actionTypes'

export const getIncomes = async (dispatch: Dispatch<any>) => {
  dispatch({ type: SharedActionTypes.GET_DATA_START })
  try {
    const {
      data: { response },
    } = await IncomesApi.getIncomes()

    dispatch({ type: IncomesActionTypes.GET_INCOMES, payload: response })
  } catch {
    dispatch({ type: SharedActionTypes.GET_DATA_ERROR })
  }
}

export const addIncome = async (incomeData: NewIncome, dispatch: Dispatch<any>) => {
  dispatch({ type: SharedActionTypes.UPDATE_DATA_START })

  try {
    await IncomesApi.addIncome(incomeData)

    dispatch({ type: SharedActionTypes.UPDATE_DATA_SUCCESS })

    await getIncomes(dispatch)
  } catch {
    dispatch({ type: SharedActionTypes.UPDATE_DATA_FAIL })
  }
}
