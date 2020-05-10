export type Income = {
  title: string
  value: number
  id: number
}

export type NewIncome = {
  [id: string]: {
    name: string
    value: number | undefined
    date: string
  }
}
