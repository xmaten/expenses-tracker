export type Expense = {
  id: number
  title: string
  value: number
  date: string
  category: string
}

export type NewExpense = {
  title: string
  value: number | undefined
  category: string
  date: string
}
