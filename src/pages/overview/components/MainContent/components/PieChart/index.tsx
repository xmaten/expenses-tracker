import React, { useState, useContext, useEffect } from 'react'
import { Doughnut } from 'react-chartjs-2'

import { store } from 'store/store'
import { Expense } from 'api/expenses/expenses.model'

interface ChartData {
  labels: any
  datasets: any
}

export const PieChart = () => {
  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    datasets: [],
  })
  const { state } = useContext(store)

  const parseApiData = (data: Expense[]) => {
    let categoryValuePair: Record<string, number> = {}

    data.forEach((item) => {
      if (categoryValuePair[item.category]) {
        categoryValuePair[item.category] = categoryValuePair[item.category] + item.value
      } else {
        categoryValuePair[item.category] = item.value
      }
    })

    const labels = Object.keys(categoryValuePair)
    const values = Object.values(categoryValuePair)

    const dataset = {
      labels,
      datasets: [
        {
          data: values,
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FEA341'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FEA341'],
        },
      ],
    }

    setChartData(dataset)
  }

  useEffect(() => {
    parseApiData(state.expenses.fromTimePeriod)
  }, [state.expenses.fromTimePeriod])

  return <Doughnut data={chartData} />
}
