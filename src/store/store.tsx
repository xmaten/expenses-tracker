import React, { createContext, useReducer } from 'react'

import { ActionTypes } from './actionTypes'

const initialState: any = {
  expenses: [],
}

const store = createContext(initialState)
const { Provider } = store

const StateProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer((state: any, action: any) => {
    switch (action.type) {
      case ActionTypes.GET_EXPENSES:
        const newState = {
          ...state,
          expenses: action.payload,
        }
        return newState
      default:
        throw new Error()
    }
  }, initialState)

  return <Provider value={{ state, dispatch }}>{children}</Provider>
}

export { store, StateProvider }
