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
}

const initialState: any = {
  expenses: [],
  revenues: [],
}

const store = createContext(initialState)
const { Provider } = store

const StateProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer((state: State, action: Action) => {
    switch (action.type) {
      case ActionTypes.GET_EXPENSES:
        return {
          ...state,
          expenses: action.payload,
        }
      case ActionTypes.GET_REVENUES:
        return {
          ...state,
          revenues: action.payload,
        }
      default:
        throw new Error()
    }
  }, initialState)

  return <Provider value={{ state, dispatch }}>{children}</Provider>
}

export { store, StateProvider }
