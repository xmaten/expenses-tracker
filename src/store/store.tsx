import React, { createContext, useReducer } from 'react'
import dayjs from 'dayjs'

import { Expense } from 'api/expenses/expenses.model'
import { Income } from 'api/incomes/incomes.model'
import { ExpensesActionTypes } from 'store/expenses'
import { SharedActionTypes } from 'store/shared'
import { IncomesActionTypes } from 'store/incomes'
import { AuthActionTypes } from 'store/auth'

type Action = {
  payload: any
  type: string
}

type State = {
  expenses: {
    all: Expense[]
    fromTimePeriod: Expense[]
    fromGivenDay: Expense[]
    fromChosenMonth: Expense[]
  }
  incomes: {
    all: Income[]
    fromTimePeriod: Income[]
    fromChosenMonth: Income[]
  }
  isLoading: boolean
  isError: boolean
  isSuccess: boolean
  chosenMonth: number
}

const initialState = {
  expenses: {
    all: [],
    fromTimePeriod: [],
    fromGivenDay: [],
    fromChosenMonth: [],
  },
  incomes: {
    all: [],
    fromTimePeriod: [],
    fromChosenMonth: [],
  },
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
      case SharedActionTypes.GET_DATA_START:
        return {
          ...state,
          isLoading: true,
        }
      case SharedActionTypes.GET_DATA_ERROR:
        return {
          ...state,
          isLoading: false,
          isError: true,
        }
      case ExpensesActionTypes.GET_EXPENSES:
        return {
          ...state,
          isLoading: false,
          isError: false,
          expenses: {
            ...state.expenses,
            all: action.payload,
          },
        }
      case ExpensesActionTypes.SET_EXPENSES_FROM_TIME_PERIOD:
        return {
          ...state,
          expenses: {
            ...state.expenses,
            fromTimePeriod: action.payload,
          },
        }
      case ExpensesActionTypes.SET_EXPENSES_FROM_GIVEN_DAY:
        return {
          ...state,
          expenses: {
            ...state.expenses,
            fromGivenDay: action.payload,
          },
        }
      case ExpensesActionTypes.SET_EXPENSES_FROM_CHOSEN_MONTH:
        return {
          ...state,
          expenses: {
            ...state.expenses,
            fromChosenMonth: action.payload,
          },
        }
      case IncomesActionTypes.GET_INCOMES:
        return {
          ...state,
          isLoading: false,
          isError: false,
          incomes: {
            ...state.incomes,
            all: action.payload,
          },
        }
      case IncomesActionTypes.SET_INCOMES_FROM_TIME_PERIOD:
        return {
          ...state,
          incomes: {
            ...state.incomes,
            fromTimePeriod: action.payload,
          },
        }
      case IncomesActionTypes.SET_INCOMES_FROM_CHOSEN_MONTH:
        return {
          ...state,
          incomes: {
            ...state.incomes,
            fromChosenMonth: action.payload,
          },
        }
      case SharedActionTypes.UPDATE_DATA_START:
        return {
          ...state,
          isLoading: true,
          isError: false,
          isSuccess: false,
        }
      case SharedActionTypes.UPDATE_DATA_SUCCESS:
        return {
          ...state,
          isLoading: false,
          isError: false,
          isSuccess: true,
        }
      case SharedActionTypes.UPDATE_DATA_FAIL:
        return {
          ...state,
          isLoading: false,
          isError: true,
          isSuccess: false,
        }
      case SharedActionTypes.SET_CHOSEN_MONTH:
        return {
          ...state,
          chosenMonth: action.payload,
        }
      case AuthActionTypes.REGISTER_START:
        return {
          ...state,
          isLoading: true,
        }
      case AuthActionTypes.REGISTER_FAIL:
        return {
          ...state,
          isLoading: false,
          isError: true,
        }
      case AuthActionTypes.REGISTER_SUCCESS:
        return {
          ...state,
          isLoading: false,
          isSuccess: true,
        }
      case AuthActionTypes.LOGIN_START:
        return {
          ...state,
          isLoading: true,
        }
      case AuthActionTypes.LOGIN_FAIL:
        return {
          ...state,
          isLoading: false,
          isError: true,
        }
      case AuthActionTypes.LOGIN_SUCCESS:
        return {
          ...state,
          isLoading: false,
          isSuccess: true,
        }
      default:
        throw new Error()
    }
  }, initialState)

  return <Provider value={{ state, dispatch }}>{children}</Provider>
}

export { store, StateProvider }
