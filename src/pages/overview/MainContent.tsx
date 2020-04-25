import React, { useState, useContext, useEffect } from 'react'
import { Row, Col, Typography, Button, Select } from 'antd'
import { PlusSquareFilled, LeftOutlined, RightOutlined } from '@ant-design/icons'

import { store } from 'store/store'
import { Expense } from 'api/expenses/expenses.model'
import { Revenue } from 'api/revenues/revenues.model'
import { getDataFromXDaysAgo } from 'utils/getDataFromXDaysAgo'
import { ActionTypes } from 'store/actionTypes'

import { LinearChart } from './mainContent/LinearChart'
import { PieChart } from './mainContent/PieChart'
import { AddNewModal } from './mainContent/AddNewModal'

const { Title } = Typography
const { Option } = Select

export const MainContent = () => {
  const { state, dispatch } = useContext(store)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [expenses, setExpenses] = useState(0)
  const [revenues, setRevenues] = useState(0)
  const [total, setTotal] = useState(0)
  const [timePeriod, setTimePeriod] = useState('month')

  const calculateExpenses = (expensesData: Expense[]) => {
    const exp = expensesData.reduce((acc, curr) => acc + curr.value, 0)
    setExpenses(exp)
  }

  const calculateRevenues = (revenuesData: Revenue[]) => {
    const rev = revenuesData.reduce((acc, curr) => acc + curr.value, 0)
    setRevenues(rev)
  }

  const calculateTotal = (totalExpenses: number, totalRevenues: number) => {
    const tot = -totalExpenses + totalRevenues
    setTotal(tot)
  }

  const recalculateDataFromXDaysAgo = (
    expensesData: Expense[],
    revenuesData: Revenue[],
    timePeriod: 'month' | 'week' | 'year',
  ) => {
    const expensesFromXDaysAgo = getDataFromXDaysAgo(expensesData, timePeriod)
    const revenuesFromXDaysAgo = getDataFromXDaysAgo(revenuesData, timePeriod)

    calculateExpenses(expensesFromXDaysAgo)
    calculateRevenues(revenuesFromXDaysAgo)
    calculateTotal(expenses, revenues)

    dispatch({ type: ActionTypes.SET_EXPENSES_FROM_X_DAYS_AGO, payload: expensesFromXDaysAgo })
    dispatch({ type: ActionTypes.SET_REVENUES_FROM_X_DAYS_AGO, payload: revenuesFromXDaysAgo })
  }

  useEffect(() => {
    recalculateDataFromXDaysAgo(state.expenses, state.revenues, 'month')
  }, [state.expenses, state.revenues])

  useEffect(() => {
    if (timePeriod === 'month' || timePeriod === 'year' || timePeriod === 'week') {
      recalculateDataFromXDaysAgo(state.expenses, state.revenues, timePeriod)
    }
  }, [timePeriod])

  return (
    <>
      <AddNewModal
        isVisible={isModalOpen}
        onCancel={setIsModalOpen}
        onOk={setIsModalOpen}
        title="Add new"
      />

      <Row style={{ padding: '24px', marginBottom: '0.5rem' }} align="middle">
        <Col span={1}>
          <LeftOutlined />
        </Col>
        <Col span={4}>
          <Typography>
            <Title level={2} style={{ marginBottom: 0 }}>
              April 2020
            </Title>
          </Typography>
        </Col>
        <Col span={2}>
          <RightOutlined />
        </Col>

        <Col span={16}>
          <Row align="middle" justify="end">
            <Button
              style={{ fontWeight: 'bold' }}
              type="primary"
              value="large"
              onClick={() => setIsModalOpen(true)}
            >
              <PlusSquareFilled />
              Add new
            </Button>
          </Row>
        </Col>
      </Row>

      <Row style={{ paddingLeft: '24px' }}>
        <Col span={6}>
          <Title level={3}>Expenses</Title>
          <Title level={4}>- {expenses}</Title>
        </Col>
        <Col span={6}>
          <Title level={3}>Revenus</Title>
          <Title level={4}>{revenues}</Title>
        </Col>
        <Col span={6}>
          <Title level={3}>Total</Title>
          <Title level={4}>{total}</Title>
        </Col>
        <Col span={6}>
          <Title level={3}>Display</Title>
          <Select
            defaultValue={timePeriod}
            style={{ width: '70%' }}
            onChange={(value) => setTimePeriod(value)}
          >
            <Option value="year">Year</Option>
            <Option value="month">Month</Option>
            <Option value="week">Week</Option>
          </Select>
        </Col>
      </Row>

      <Row style={{ marginTop: '30px' }}>
        <Col span={13}>
          <LinearChart />
        </Col>
        <Col span={11}>
          <PieChart />
        </Col>
      </Row>
    </>
  )
}
