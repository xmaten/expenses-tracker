import React, { useState, useContext, useEffect } from 'react'
import { Row, Col, Typography, Button, Select } from 'antd'
import { PlusSquareFilled, LeftOutlined, RightOutlined } from '@ant-design/icons'

import { store } from 'store/store'
import { Expense } from 'api/expenses/expenses.model'
import { Income } from 'api/incomes/incomes.model'
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
  const [incomes, setIncomes] = useState(0)
  const [total, setTotal] = useState(0)
  const [timePeriod, setTimePeriod] = useState('month')

  const calculateExpenses = (expensesData: Expense[]) => {
    const exp = expensesData.reduce((acc, curr) => acc + curr.value, 0)
    setExpenses(exp)
  }

  const calculateIncomes = (incomesData: Income[]) => {
    const inc = incomesData.reduce((acc, curr) => acc + curr.value, 0)
    setIncomes(inc)
  }

  const calculateTotal = (totalExpenses: number, totalIncomes: number) => {
    const tot = -totalExpenses + totalIncomes
    setTotal(tot)
  }

  const recalculateDataFromXDaysAgo = (
    expensesData: Expense[],
    incomesData: Income[],
    timePeriod: 'month' | 'week' | 'year',
  ) => {
    const expensesFromXDaysAgo = getDataFromXDaysAgo(expensesData, timePeriod)
    const incomesFromXDaysAgo = getDataFromXDaysAgo(incomesData, timePeriod)

    calculateExpenses(expensesFromXDaysAgo)
    calculateIncomes(incomesFromXDaysAgo)
    calculateTotal(expenses, incomes)

    dispatch({ type: ActionTypes.SET_EXPENSES_FROM_X_DAYS_AGO, payload: expensesFromXDaysAgo })
    dispatch({ type: ActionTypes.SET_INCOMES_FROM_X_DAYS_AGO, payload: incomesFromXDaysAgo })
  }

  useEffect(() => {
    recalculateDataFromXDaysAgo(state.expensesForChosenMonth, state.incomesForChosenMonth, 'month')
  }, [state.expensesForChosenMonth, state.incomesForChosenMonth])

  useEffect(() => {
    if (timePeriod === 'month' || timePeriod === 'year' || timePeriod === 'week') {
      recalculateDataFromXDaysAgo(
        state.expensesForChosenMonth,
        state.incomesForChosenMonth,
        timePeriod,
      )
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
          <Title level={3}>Incomes</Title>
          <Title level={4}>{incomes}</Title>
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
