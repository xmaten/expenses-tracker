export type Income = {
  name: string
  value: number
}

export type NewIncome = {
  [id: string]: {
    name: string
    value: number | undefined
    date: string
  }
}
