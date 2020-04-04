import React from 'react'
import { Chart, Axis, Geom } from 'bizcharts'

const data = [
  { date: 1, value: 2400 },
  { date: 2, value: 0 },
  { date: 3, value: 1500 },
  { date: 4, value: 1900 },
  { date: 5, value: 1800 },
  { date: 6, value: 1700 },
  { date: 7, value: 1600 },
  { date: 8, value: 500 },
  { date: 9, value: 400 },
  { date: 10, value: 450 },
  { date: 11, value: 600 },
  { date: 12, value: 1000 },
  { date: 13, value: 1200 },
  { date: 14, value: 0 },
  { date: 15, value: 0 },
  { date: 16, value: 0 },
  { date: 17, value: 0 },
  { date: 18, value: 0 },
  { date: 19, value: 300 },
  { date: 20, value: 0 },
  { date: 21, value: 0 },
  { date: 22, value: 0 },
  { date: 23, value: 0 },
  { date: 24, value: 0 },
  { date: 25, value: 225 },
  { date: 26, value: 0 },
  { date: 27, value: 0 },
  { date: 28, value: 0 },
  { date: 29, value: 1200 },
  { date: 20, value: 0 },
]

export const MainContent = () => (
  <Chart width={900} height={500} data={data}>
    <Axis name="value" />
    <Geom type="line" position="date*value" color="date" />
  </Chart>
)
