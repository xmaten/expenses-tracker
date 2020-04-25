import React, { useState, useContext, useEffect } from 'react'
import { Row, Col, Typography, Button, Select } from 'antd'
import { PlusSquareFilled, LeftOutlined, RightOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'

import { store } from 'store/store'
import { Expense } from 'api/expenses/expenses.model'
import { Income } from 'api/incomes/incomes.model'
import { getDataFromXDaysAgo } from 'utils/getDataFromXDaysAgo'
import { ActionTypes } from 'store/actionTypes'

import { LinearChart } from './mainContent/LinearChart'
import { PieChart } from './mainContent/PieChart'
import { AddNewModal } from './mainContent/AddNewModal'
import { getCurrentMonthName } from '../../utils/getCurrentMonthName'

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
    timePeriod: 'month' | 'week' | 'year' | null,
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
    recalculateDataFromXDaysAgo(state.expensesForChosenMonth, state.incomesForChosenMonth, null)
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

  const changeMonth = (amount: number) => {
    let nextMonth = state.chosenMonth + amount

    if (nextMonth === 13) {
      nextMonth = 1
    } else if (nextMonth === 0) {
      nextMonth = 12
    }

    dispatch({ type: ActionTypes.SET_CHOSEN_MONTH, payload: nextMonth })
  }

  return (
    <>
      <AddNewModal
        isVisible={isModalOpen}
        onCancel={setIsModalOpen}
        onOk={setIsModalOpen}
        title="Add new"
      />

      <Row style={{ padding: '24px' }} align="middle">
        <Col xs={2} lg={1}>
          <Button type="link" onClick={() => changeMonth(-1)}>
            <LeftOutlined />
          </Button>
        </Col>
        <Col xs={20} lg={6}>
          <Typography>
            <Title level={2} style={{ marginBottom: 0, textAlign: 'center' }}>
              {getCurrentMonthName(state.chosenMonth)} {dayjs().year()}
            </Title>
          </Typography>
        </Col>
        <Col xs={2} lg={1}>
          <Button type="link" onClick={() => changeMonth(1)}>
            <RightOutlined />
          </Button>
        </Col>

        <Col xs={24} lg={12} style={{ marginTop: '1rem' }}>
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
        <Col xs={12} lg={6}>
          <Title style={{ margin: 0 }} level={3}>
            Expenses
          </Title>
          <Title style={{ margin: 0 }} level={4}>
            - {expenses}
          </Title>
        </Col>
        <Col xs={12} lg={6}>
          <Title style={{ margin: 0 }} level={3}>
            Incomes
          </Title>
          <Title style={{ margin: 0 }} level={4}>
            {incomes}
          </Title>
        </Col>
        <Col xs={12} lg={6} style={{ marginTop: '1rem' }}>
          <Title style={{ margin: 0 }} level={3}>
            Total
          </Title>
          <Title style={{ margin: 0 }} level={4}>
            {total}
          </Title>
        </Col>
        {state.chosenMonth === dayjs().month() + 1 && (
          <Col xs={12} lg={6} style={{ marginTop: '1rem' }}>
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
        )}
      </Row>

      <Row style={{ marginTop: '30px' }}>
        <Col xs={24} lg={14} style={{ overflowX: 'scroll' }}>
          <LinearChart />
        </Col>
        <Col xs={24} lg={10} style={{ overflowX: 'scroll' }}>
          <PieChart />
        </Col>
      </Row>
    </>
  )
}
