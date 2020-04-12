import React, { useState, useContext, useEffect } from 'react'
import { Chart, Tooltip, Legend, Facet } from 'bizcharts'
import DataSet from '@antv/data-set'

import { store } from 'store/store'
import { Expense } from 'api/expenses/expenses.model'

interface ChartData {
  category: string
  price: number
}

export const PieChart = () => {
  const { DataView } = DataSet
  const [chartData, setChartData] = useState<ChartData[]>([])
  const { state } = useContext(store)

  const parseApiData = (data: Expense[]) => {
    const parsedData = data.map((item) => ({
      price: Number(item.price),
      category: item.category,
      month: 'April',
    }))
    setChartData(parsedData)
  }

  useEffect(() => {
    parseApiData(state.expenses)
  }, [state.expenses])

  return (
    <div>
      <Chart data={chartData} width={600} height={500}>
        <Tooltip showTitle={false} />
        <Legend offsetY={60} />
        <Facet
          type="rect"
          fields={['month']}
          padding={50}
          colTitle={{
            offsetY: -30,
            style: {
              fontSize: 18,
              textAlign: 'center',
              fill: '#999',
            },
          }}
          eachView={(view, facet) => {
            const data = facet.data
            const dv = new DataView()
            dv.source(data).transform({
              type: 'percent',
              field: 'price',
              dimension: 'category',
              as: 'percent',
            })
            view.source(dv, {
              percent: {
                formatter: (val: number) => {
                  return (val * 100).toFixed(2) + '%'
                },
              },
            })
            view.coord('theta', {
              innerRadius: 0.35,
            })
            view
              .intervalStack()
              .position('percent')
              .color('category')
              .label('percent', {
                offset: -8,
              })
              .style({
                lineWidth: 1,
                stroke: '#fff',
              })
          }}
        />
      </Chart>
    </div>
  )
}
