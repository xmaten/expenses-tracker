import React, { useState, useContext, useEffect } from 'react'
import dayjs from 'dayjs'
import { Line } from 'react-chartjs-2'
import { useTranslation } from 'react-i18next'

import { store } from 'store/store'
import { Expense } from 'api/expenses/expenses.model'

interface ChartData {
  labels: any
  datasets: any
}

export const LinearChart = () => {
  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    datasets: [],
  })
  const { state } = useContext(store)
  const { t } = useTranslation()

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

    const labels = Object.keys(dateValuePair)
    const values = Object.values(dateValuePair)

    const dataset = {
      labels,
      datasets: [
        {
          label: t('expenses'),
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: values,
        },
      ],
    }

    setChartData(dataset)
  }

  useEffect(() => {
    parseApiData(state.expensesFromTimePeriod)
  }, [state.expensesFromTimePeriod])

  return <Line data={chartData} />
}
