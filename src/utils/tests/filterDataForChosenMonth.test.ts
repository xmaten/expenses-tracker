import { filterDataForChosenMonth } from 'utils/filterDataForChosenMonth'

const mockData = [
  {
    date: '2020-04-25T13:51:56.007Z',
    id: 0,
    title: '',
    value: 0,
    category: '',
  },
  {
    date: '2020-04-20T13:51:56.007Z',
    id: 0,
    title: '',
    value: 0,
    category: '',
  },
  {
    date: '2020-04-15T13:51:56.007Z',
    id: 0,
    title: '',
    value: 0,
    category: '',
  },
  {
    date: '2020-03-25T13:51:56.007Z',
    id: 0,
    title: '',
    value: 0,
    category: '',
  },
  {
    date: '2020-02-25T13:51:56.007Z',
    id: 0,
    title: '',
    value: 0,
    category: '',
  },
]

describe('Filter data for chosen month', () => {
  test('It should filter to return data only for chosen month', () => {
    const month = 4
    expect(filterDataForChosenMonth(mockData, month).length).toEqual(3)
  })
})
