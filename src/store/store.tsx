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
  revenues: Revenue[]
  isLoading: boolean
  isError: boolean
  isSuccess: boolean
}

const initialState: any = {
  expenses: [],
  revenues: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
}

const store = createContext(initialState)
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
      case ActionTypes.GET_REVENUES:
        return {
          ...state,
          isLoading: false,
          isError: false,
          revenues: action.payload,
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
      default:
        throw new Error()
    }
  }, initialState)

  return <Provider value={{ state, dispatch }}>{children}</Provider>
}

export { store, StateProvider }
