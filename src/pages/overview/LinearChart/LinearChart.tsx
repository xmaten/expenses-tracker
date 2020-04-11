import React, { useState, useContext, useEffect } from 'react'
import { Chart, Axis, Geom } from 'bizcharts'

import { store } from 'store/store'

interface ChartData {
  value: number
  date: number
}

export const LinearChart = () => {
  const [chartData, setChartData] = useState<ChartData[]>([])
  const { state } = useContext(store)

  const parseApiData = (data: any) => {
    const parsedData = data.map((item: any) => ({
      value: Number(item.price),
      date: Number(item.date.split('.')[0]),
    }))
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
