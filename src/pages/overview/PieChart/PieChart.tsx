import React from 'react'
import { Chart, Tooltip, Legend, Facet } from 'bizcharts'
import DataSet from '@antv/data-set'

const data = [
  {
    month: 'April',
    category: 'Electronics',
    profit: 300,
  },
  {
    month: 'April',
    category: 'Electronics',
    profit: 400,
  },
  {
    month: 'April',
    category: 'Food',
    profit: 300,
  },
  {
    month: 'April',
    category: 'Food',
    profit: 500,
  },
  {
    month: 'April',
    category: 'Food',
    profit: 1200,
  },
  {
    month: 'April',
    category: 'Electronics',
    profit: 1000,
  },
]

export const PieChart = () => {
  const { DataView } = DataSet

  return (
    <div>
      <Chart data={data} width={600} height={500}>
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
              field: 'profit',
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
