import { getCurrentMonthName } from './getCurrentMonthName'

describe('Get current month name', () => {
  test('It should filter to return data only for chosen month', () => {
    const month = 4
    expect(getCurrentMonthName(month)).toEqual('Kwiecień')
  })
})
