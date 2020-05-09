import React, { useState, useContext, useEffect } from 'react'
import { Row, Col, Typography, Button, Select } from 'antd'
import { PlusSquareFilled, LeftOutlined, RightOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'

import { store } from 'store/store'
import { Expense } from 'api/expenses/expenses.model'
import { Income } from 'api/incomes/incomes.model'
import { getDataFromXDaysAgo } from 'utils/getDataFromXDaysAgo'
import { ActionTypes } from 'store/actionTypes'
import { getCurrentMonthName } from 'utils/getCurrentMonthName'

import { LinearChart } from './components/LinearChart'
import { PieChart } from './components/PieChart'
import { AddNewModal } from './components/AddNewModal'
import styles from './style.module.css'

const { Title } = Typography
const { Option } = Select

export const calculateExpenses = (expensesData: Expense[]) => {
  return expensesData.reduce((acc, curr) => acc + curr.value, 0)
}

export const calculateIncomes = (incomesData: Income[]) => {
  return incomesData.reduce((acc, curr) => acc + curr.value, 0)
}

export const calculateTotal = (totalExpenses: number, totalIncomes: number) => {
  return -totalExpenses + totalIncomes
}

export const MainContent = () => {
  const { state, dispatch } = useContext(store)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [expenses, setExpenses] = useState(0)
  const [incomes, setIncomes] = useState(0)
  const [total, setTotal] = useState(0)
  const [timePeriod, setTimePeriod] = useState('month')

  const recalculateDataFromXDaysAgo = (
    expensesData: Expense[],
    incomesData: Income[],
    timePeriod: 'month' | 'week' | 'two-weeks' | null,
  ) => {
    const expensesFromXDaysAgo = getDataFromXDaysAgo(expensesData, timePeriod)
    const incomesFromXDaysAgo = getDataFromXDaysAgo(incomesData, timePeriod)

    const exp = calculateExpenses(expensesFromXDaysAgo)
    const inc = calculateIncomes(incomesFromXDaysAgo)
    const tot = calculateTotal(expenses, incomes)
    setExpenses(exp)
    setIncomes(inc)
    setTotal(tot)

    dispatch({ type: ActionTypes.SET_EXPENSES_FROM_X_DAYS_AGO, payload: expensesFromXDaysAgo })
    dispatch({ type: ActionTypes.SET_INCOMES_FROM_X_DAYS_AGO, payload: incomesFromXDaysAgo })
  }

  useEffect(() => {
    recalculateDataFromXDaysAgo(state.expensesForChosenMonth, state.incomesForChosenMonth, null)
  }, [state.expensesForChosenMonth, state.incomesForChosenMonth])

  useEffect(() => {
    if (timePeriod === 'month' || timePeriod === 'two-weeks' || timePeriod === 'week') {
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

      <Row className={styles.header} align="middle">
        <Col xs={2} lg={1}>
          <Button type="link" onClick={() => changeMonth(-1)}>
            <LeftOutlined />
          </Button>
        </Col>
        <Col xs={20} lg={6}>
          <Typography>
            <Title level={2} className={styles.header__month}>
              {getCurrentMonthName(state.chosenMonth)} {dayjs().year()}
            </Title>
          </Typography>
        </Col>
        <Col xs={2} lg={1}>
          <Button type="link" onClick={() => changeMonth(1)}>
            <RightOutlined />
          </Button>
        </Col>

        <Col xs={24} lg={12} className={styles.addNew__wrapper}>
          <Row align="middle" justify="end">
            <Button
              className={styles.addNew__button}
              type="primary"
              value="large"
              onClick={() => setIsModalOpen(true)}
              data-testid="add-new-button"
            >
              <PlusSquareFilled />
              Add new
            </Button>
          </Row>
        </Col>
      </Row>

      <Row className={styles.stats}>
        <Col xs={12} lg={6}>
          <Title className={styles.stats__title} level={3}>
            Expenses
          </Title>
          <Title className={styles.stats__title} level={4} data-testid="expenses-val">
            - {expenses}
          </Title>
        </Col>
        <Col xs={12} lg={6}>
          <Title className={styles.stats__title} level={3}>
            Incomes
          </Title>
          <Title className={styles.stats__title} level={4} data-testid="incomes-val">
            {incomes}
          </Title>
        </Col>
        <Col xs={12} lg={6}>
          <Title className={styles.stats__title} level={3}>
            Total
          </Title>
          <Title className={styles.stats__title} level={4} data-testid="total-val">
            {total}
          </Title>
        </Col>
        {state.chosenMonth === dayjs().month() + 1 && (
          <Col xs={12} lg={6}>
            <Title level={3}>Display</Title>
            <Select
              defaultValue={timePeriod}
              className={styles.select}
              onChange={(value) => setTimePeriod(value)}
            >
              <Option value="month">Month</Option>
              <Option value="two-weeks">Two weeks</Option>
              <Option value="week">Week</Option>
            </Select>
          </Col>
        )}
      </Row>

      <Row className={styles.charts__wrapper}>
        <Col xs={24} lg={14} className={styles.chart__wrapper}>
          <LinearChart />
        </Col>
        <Col xs={24} lg={10} className={styles.chart__wrapper}>
          <PieChart />
        </Col>
      </Row>
    </>
  )
}
