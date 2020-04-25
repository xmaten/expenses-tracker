import React, { useState, useContext, useEffect } from 'react'
import { Chart, Axis, Geom } from 'bizcharts'
import dayjs from 'dayjs'

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
      date: dayjs(item.date).date(),
    }))

    const sortedByDate = parsedData.sort((a, b) => a.date - b.date)
    let dateValuePair: Record<string, number> = {}

    sortedByDate.forEach((item) => {
      if (dateValuePair[item.date]) {
        dateValuePair[item.date] = dateValuePair[item.date] + item.value
      } else {
        dateValuePair[item.date] = item.value
      }
    })

    const result = Object.keys(dateValuePair).map((key) => {
      return {
        date: Number(key),
        value: dateValuePair[key],
      }
    })

    setChartData(result)
  }

  useEffect(() => {
    parseApiData(state.expensesFromXDaysAgo)
  }, [state.expensesFromXDaysAgo])

  return (
    <Chart width={900} height={500} data={chartData}>
      <Axis name="value" />
      <Geom type="line" position="date*value" color="date" />
    </Chart>
  )
}
