import React, { useState, useContext, useEffect } from 'react'
import { Chart, Axis, Geom } from 'bizcharts'
import { getDate } from 'date-fns'

import { store } from 'store/store'
import { Expense } from 'api/expenses/expenses.model'

interface ChartData {
  value: number
  date: number
}

export const LinearChart = () => {
  const [chartData, setChartData] = useState<ChartData[]>([])
  const { state } = useContext(store)

  const parseApiData = (data: Expense[]) => {
    const parsedData = data.map((item) => ({
      value: Number(item.value),
      date: getDate(new Date(item.date)),
    }))

    // TODO: Finish that
    const combinedValuesFromSameDay = parsedData.map((item, index) => {
      let value = item.value
      if (parsedData[index + 1]) {
        if (item.date === parsedData[index + 1].date) {
          value = item.value + parsedData[index + 1].value
        }
      }

      return {
        date: item.date,
        value,
      }
    })

    setChartData(parsedData)
  }

  useEffect(() => {
    parseApiData(state.expenses)
  }, [state.expenses])

  return (
    <Chart width={750} height={500} data={chartData}>
      <Axis name="value" />
      <Geom type="line" position="date*value" color="date" />
    </Chart>
  )
}
