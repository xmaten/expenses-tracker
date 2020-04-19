import React, { useState, useContext, useEffect } from 'react'
import { Row, Col, Typography, Button, Select } from 'antd'
import { PlusSquareFilled } from '@ant-design/icons'

import { store } from 'store/store'
import { Expense } from 'api/expenses/expenses.model'
import { Revenue } from 'api/revenues/revenues.model'

import { LinearChart } from './LinearChart/LinearChart'
import { PieChart } from './PieChart/PieChart'
import { AddNewModal } from './AddNewModal/AddNewModal'

const { Title } = Typography
const { Option } = Select

export const MainContent = () => {
  const { state } = useContext(store)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [expenses, setExpenses] = useState(0)
  const [revenues, setRevenues] = useState(0)
  const [total, setTotal] = useState(0)

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

  useEffect(() => {
    calculateExpenses(state.expenses)
    calculateRevenues(state.revenues)
    calculateTotal(expenses, revenues)
  }, [expenses, revenues, state.expenses, state.revenues])

  return (
    <>
      <AddNewModal
        isVisible={isModalOpen}
        onCancel={setIsModalOpen}
        onOk={setIsModalOpen}
        title="Add new"
      />

      <Row style={{ padding: '24px' }}>
        <Col span={18}>
          <Typography>
            <Title level={2}>April 2020</Title>
          </Typography>
        </Col>

        <Col span={6}>
          <Row align="middle" justify="center">
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
          <Select defaultValue="month" style={{ width: '70%' }}>
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
