export type Revenue = {
  name: string
  value: number
}

export type NewRevenue = {
  [id: string]: {
    name: string
    value: number | undefined
    date: string
  }
}
