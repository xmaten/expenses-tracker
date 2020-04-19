import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'

dayjs.extend(isBetween)

export const getDataFromXDaysAgo = (data: any, timePeriod: 'month' | 'week' | 'year') => {
  const today = dayjs()
  let xDaysAgo = dayjs()

  if (timePeriod === 'month') {
    xDaysAgo = dayjs().subtract(1, 'month')
  } else if (timePeriod === 'week') {
    xDaysAgo = dayjs().subtract(7, 'day')
  } else if (timePeriod === 'year') {
    xDaysAgo = dayjs().subtract(1, 'year')
  }

  const dates = data.filter((item: any) => dayjs(item.date).isBetween(today, xDaysAgo))

  return dates
}
