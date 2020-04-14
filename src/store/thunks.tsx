import { ExpensesApi } from 'api/expenses/expenses'
import { RevenuesApi } from 'api/revenues/revenues'

export const getExpenses = async () => {
  const { data } = await ExpensesApi.getExpenses()
  const dataWithId = []
  for (const val in data) {
    const valuesWithId = {
      ...data[val],
      id: val,
    }

    dataWithId.push(valuesWithId)
  }

  return dataWithId
}

export const getRevenues = async () => {
  const { data } = await RevenuesApi.getRevenues()
  const dataWithId = []
  for (const val in data) {
    const valuesWithId = {
      ...data[val],
      id: val,
    }

    dataWithId.push(valuesWithId)
  }

  return dataWithId
}
