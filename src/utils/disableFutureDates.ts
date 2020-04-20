import dayjs from 'dayjs'

export const disableFutureDates = (current: dayjs.Dayjs) => {
  return current && current.valueOf() > Date.now()
}
