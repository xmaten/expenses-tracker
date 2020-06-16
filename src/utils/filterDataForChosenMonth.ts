import { Expense } from 'api/expenses/expenses.model'

export const filterDataForChosenMonth = (data: Expense[], month: number) => {
  return data.filter((item) => Number(item.date.split('-')[1]) === month)
}
