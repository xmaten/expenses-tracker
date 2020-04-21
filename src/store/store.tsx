import React, { createContext, useReducer } from 'react'

import { Expense } from 'api/expenses/expenses.model'
import { Revenue } from 'api/revenues/revenues.model'

import { ActionTypes } from './actionTypes'

type Action = {
  payload: any
  type: string
}

type State = {
  expenses: Expense[]
  expensesFromXDaysAgo: Expense[]
  revenues: Revenue[]
  revenuesFromXDaysAgo: Revenue[]
  expensesFromGivenDay: Expense[]
  isLoading: boolean
  isError: boolean
  isSuccess: boolean
}

const initialState = {
  expenses: [],
  expensesFromXDaysAgo: [],
  revenues: [],
  revenuesFromXDaysAgo: [],
  expensesFromGivenDay: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
}

const store = createContext<{
  state: State
  dispatch: React.Dispatch<any>
}>({
  state: initialState,
  dispatch: () => null,
})
const { Provider } = store

const StateProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer((state: State, action: Action) => {
    switch (action.type) {
      case ActionTypes.GET_DATA_START:
        return {
          ...state,
          isLoading: true,
        }
      case ActionTypes.GET_DATA_ERROR:
        return {
          ...state,
          isLoading: false,
          isError: true,
        }
      case ActionTypes.GET_EXPENSES:
        return {
          ...state,
          isLoading: false,
          isError: false,
          expenses: action.payload,
        }
      case ActionTypes.SET_EXPENSES_FROM_X_DAYS_AGO:
        return {
          ...state,
          expensesFromXDaysAgo: action.payload,
        }
      case ActionTypes.GET_REVENUES:
        return {
          ...state,
          isLoading: false,
          isError: false,
          revenues: action.payload,
        }
      case ActionTypes.SET_REVENUES_FROM_X_DAYS_AGO:
        return {
          ...state,
          revenuesFromXDaysAgo: action.payload,
        }
      case ActionTypes.UPDATE_DATA_START:
        return {
          ...state,
          isLoading: true,
          isError: false,
          isSuccess: false,
        }
      case ActionTypes.UPDATE_DATA_SUCCESS:
        return {
          ...state,
          isLoading: false,
          isError: false,
          isSuccess: true,
        }
      case ActionTypes.UPDATE_DATA_FAIL:
        return {
          ...state,
          isLoading: false,
          isError: true,
          isSuccess: false,
        }
      case ActionTypes.SET_EXPENSES_FROM_GIVEN_DAY:
        return {
          ...state,
          expensesFromGivenDay: action.payload,
        }
      default:
        throw new Error()
    }
  }, initialState)

  return <Provider value={{ state, dispatch }}>{children}</Provider>
}

export { store, StateProvider }
