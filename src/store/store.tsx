import React, { createContext, useReducer } from 'react'

import { Expense } from 'api/expenses/expenses.model'
import { Income } from 'api/incomes/incomes.model'

import { ActionTypes } from './actionTypes'
import dayjs from 'dayjs'

type Action = {
  payload: any
  type: string
}

type State = {
  expenses: Expense[]
  expensesFromXDaysAgo: Expense[]
  incomes: Income[]
  incomesForChosenMonth: Income[]
  incomesFromXDaysAgo: Income[]
  expensesFromGivenDay: Expense[]
  expensesForChosenMonth: Expense[]
  isLoading: boolean
  isError: boolean
  isSuccess: boolean
  chosenMonth: number
}

const initialState = {
  expenses: [],
  expensesFromXDaysAgo: [],
  incomes: [],
  incomesForChosenMonth: [],
  incomesFromXDaysAgo: [],
  expensesFromGivenDay: [],
  expensesForChosenMonth: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  chosenMonth: dayjs().month() + 1,
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
      case ActionTypes.GET_INCOMES:
        return {
          ...state,
          isLoading: false,
          isError: false,
          incomes: action.payload,
        }
      case ActionTypes.SET_INCOMES_FROM_X_DAYS_AGO:
        return {
          ...state,
          incomesFromXDaysAgo: action.payload,
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
      case ActionTypes.SET_EXPENSES_FOR_CHOSEN_MONTH:
        return {
          ...state,
          expensesForChosenMonth: action.payload,
        }
      case ActionTypes.SET_INCOMES_FOR_CHOSEN_MONTH:
        return {
          ...state,
          incomesForChosenMonth: action.payload,
        }
      case ActionTypes.SET_CHOSEN_MONTH:
        return {
          ...state,
          chosenMonth: action.payload,
        }
      default:
        throw new Error()
    }
  }, initialState)

  return <Provider value={{ state, dispatch }}>{children}</Provider>
}

export { store, StateProvider }
