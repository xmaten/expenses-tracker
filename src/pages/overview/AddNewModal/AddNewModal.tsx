import React, { useState, useContext } from 'react'
import { Modal, Row, Col, Typography, Select, Input, InputNumber } from 'antd'
import { v4 as uuidv4 } from 'uuid'

import { NewExpense } from 'api/expenses/expenses.model'
import { NewRevenue } from 'api/revenues/revenues.model'
import { ExpensesApi } from 'api/expenses/expenses'
import { store } from 'store/store'
import { ActionTypes } from 'store/actionTypes'
import { RevenuesApi } from 'api/revenues/revenues'

type Props = {
  title: string
  isVisible: boolean
  onOk: (isVisible: boolean) => void
  onCancel: (isVisible: boolean) => void
}

const { Title } = Typography
const { Option } = Select

export const AddNewModal: React.FC<Props> = ({ title, isVisible, onOk, onCancel }) => {
  const { dispatch } = useContext(store)
  const [nameVal, setNameVal] = useState('')
  const [typeVal, setTypeVal] = useState('expense')
  const [valueVal, setValueVal] = useState<number | undefined>(undefined)
  const [categoryVal, setCategoryVal] = useState('food')

  const addExpense = async (expenseData: NewExpense) => {
    dispatch({ type: ActionTypes.UPDATE_DATA_START })

    try {
      await ExpensesApi.addExpenses(expenseData)

      dispatch({ type: ActionTypes.UPDATE_DATA_SUCCESS })
      onOk(false)
    } catch {
      dispatch({ type: ActionTypes.UPDATE_DATA_FAIL })
      console.log('error')
    }
  }

  const addRevenue = async (revenueData: NewRevenue) => {
    dispatch({ type: ActionTypes.UPDATE_DATA_START })

    try {
      await RevenuesApi.addReveune(revenueData)

      dispatch({ type: ActionTypes.UPDATE_DATA_SUCCESS })
      onOk(false)
    } catch {
      dispatch({ type: ActionTypes.UPDATE_DATA_FAIL })
      console.log('error')
    }
  }

  const onSubmit = () => {
    if (typeVal === 'expense') {
      uuidv4()
      const baseData = {
        [uuidv4().toString()]: {
          name: nameVal,
          value: valueVal,
          date: new Date().toISOString(),
          category: categoryVal,
        },
      }

      addExpense(baseData)
    } else if (typeVal === 'revenue') {
      const baseData = {
        [uuidv4().toString()]: {
          name: nameVal,
          value: valueVal,
          date: new Date().toISOString(),
        },
      }

      addRevenue(baseData)
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <Modal
        title={title}
        visible={isVisible}
        onOk={() => onSubmit()}
        onCancel={() => onCancel(false)}
      >
        <Row type="flex" justify="space-between">
          <Col span={12}>
            <Title level={3}>Type</Title>
            <Select
              defaultValue={typeVal}
              onChange={(val: string) => setTypeVal(val)}
              style={{ width: '100%' }}
            >
              <Option value="expense">Expense</Option>
              <Option value="revenue">Revenue</Option>
            </Select>
          </Col>
          <Col span={11}>
            <Title level={3}>Category</Title>
            <Select
              defaultValue={categoryVal}
              onChange={(val: string) => setCategoryVal(val)}
              style={{ width: '100%' }}
            >
              <Option value="electronics">Electronics</Option>
              <Option value="credit">Credit</Option>
              <Option value="food">Food</Option>
              <Option value="entertainment">Entertainment</Option>
              <Option value="other">Other</Option>
            </Select>
          </Col>
        </Row>
        <Row style={{ marginTop: '50px' }} type="flex" justify="space-between">
          <Col span={12}>
            <Title level={3}>Name</Title>
            <Input
              placeholder="Type here"
              name="name"
              value={nameVal}
              onChange={(e) => setNameVal(e.target.value)}
            />
          </Col>
          <Col span={11}>
            <Title level={3}>Value</Title>
            <InputNumber
              placeholder="Type here"
              style={{ width: '100%' }}
              name="value"
              value={valueVal}
              onChange={(val) => setValueVal(val)}
            />
          </Col>
        </Row>
      </Modal>
    </form>
  )
}
