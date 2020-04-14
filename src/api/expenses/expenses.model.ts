export type Expense = {
  name: string
  value: number
  date: string
  category: string
}

export type NewExpense = {
  [id: string]: {
    name: string
    value: number | undefined
    category: string
    date: string
  }
}
