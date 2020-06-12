import MockDate from 'mockdate'
import { getDataForTimePeriod } from 'utils/getDataForTimePeriod'

beforeEach(() => {
  MockDate.set(new Date('06.12.2020'))
})

afterEach(() => {
  MockDate.reset()
})

const mockData = [
  {
    date: '2020-06-11T13:51:56.007Z',
  },
  {
    date: '2020-06-02T13:51:56.007Z',
  },
  {
    date: '2020-06-06T13:51:56.007Z',
  },
  {
    date: '2020-03-25T13:51:56.007Z',
  },
  {
    date: '2020-02-25T13:51:56.007Z',
  },
]

describe('Get data for time period', () => {
  test('Should return data for month', () => {
    expect(getDataForTimePeriod(mockData, 'month').length).toEqual(3)
  })

  test('Should return data for two weeks', () => {
    expect(getDataForTimePeriod(mockData, 'two-weeks').length).toEqual(3)
  })

  test('Should return data for week', () => {
    expect(getDataForTimePeriod(mockData, 'week').length).toEqual(2)
  })
})
