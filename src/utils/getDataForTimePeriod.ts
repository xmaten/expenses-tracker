import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'

import { Expense } from 'api/expenses/expenses.model'
import { Income } from 'api/incomes/incomes.model'

dayjs.extend(isBetween)

export const getDataForTimePeriod = (
  data: Expense[] | Income[],
  timePeriod: 'month' | 'week' | 'two-weeks' | null,
) => {
  if (!timePeriod) {
    return data
  }

  const today = dayjs()
  let xDaysAgo = dayjs()

  if (timePeriod === 'month') {
    xDaysAgo = dayjs().subtract(1, 'month')
  } else if (timePeriod === 'week') {
    xDaysAgo = dayjs().subtract(7, 'day')
  } else if (timePeriod === 'two-weeks') {
    xDaysAgo = dayjs().subtract(14, 'day')
  }

  return data.filter((item: any) => dayjs(item.date).isBetween(today, xDaysAgo))
}
