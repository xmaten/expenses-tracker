import { getCurrentMonthName } from 'utils/getCurrentMonthName'
import { LocalStorageMock } from 'utils/testUtils/mockLocalStorage'

global.localStorage = new LocalStorageMock()

describe('Get current month name', () => {
  test('It should return given month in EN', () => {
    const month = 4
    expect(getCurrentMonthName(month)).toEqual('April')
  })

  test('It should return given month in PL', () => {
    const month = 4
    localStorage.setItem('language', 'pl')
    expect(getCurrentMonthName(month)).toEqual('Kwiecień')
  })
})
