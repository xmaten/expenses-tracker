import { Expense } from 'api/expenses/expenses.model'
import { Income } from 'api/incomes/incomes.model'

export const filterDataForChosenMonth = (data: Expense[] | Income[], month: number) => {
  return data.filter((item: any) => Number(item.date.split('-')[1]) === month)
}
