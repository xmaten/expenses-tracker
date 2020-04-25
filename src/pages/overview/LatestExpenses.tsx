import React, { useContext, useEffect, useState } from 'react'
import { Row, Col, Typography, Avatar } from 'antd'

import Calendar from 'components/dataInput/Calendar'
import { store } from 'store/store'
import { Expense } from 'api/expenses/expenses.model'
import { disableFutureDates } from 'utils/disableFutureDates'
import dayjs, { Dayjs } from 'dayjs'
import { ActionTypes } from 'store/actionTypes'

import { ExpensesFromGivenDayModal } from './latestExpenses/ExpensesFromGivenDayModal'
import { dateFormats } from '../../utils/dateFormats'

const { Title, Paragraph } = Typography

export const LatestExpenses = () => {
  const [isExpensesModalVisible, setIsExpensesModalVisible] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs())
  const { state, dispatch } = useContext(store)

  const getLatestExpenses = (data: Expense[]) => {
    return data.sort((a, b) => dayjs(b.date).diff(a.date)).slice(0, 3)
  }

  const onDateSelect = (value: dayjs.Dayjs) => {
    setSelectedDate(value)
    setIsExpensesModalVisible(true)
  }

  useEffect(() => {
    const sameDayExpenses = state.expenses.filter((item: Expense) =>
      dayjs(item.date).isSame(selectedDate, 'day'),
    )

    dispatch({ type: ActionTypes.SET_EXPENSES_FROM_GIVEN_DAY, payload: sameDayExpenses })
  }, [selectedDate])

  return (
    <Row>
      <ExpensesFromGivenDayModal
        title={`Expenses from ${dayjs(selectedDate).format(dateFormats.fullDate)}`}
        isVisible={isExpensesModalVisible}
        onOk={setIsExpensesModalVisible}
        onCancel={setIsExpensesModalVisible}
      />
      <Col span={24} style={{ padding: '24px' }}>
        <Typography>
          <Title level={2}>Latest expenses</Title>
        </Typography>

        {getLatestExpenses(state.expenses).map((item) => (
          <Row style={{ marginTop: '50px' }} key={item.name}>
            <Col span={6}>
              <Avatar shape="square" size={64} />
            </Col>
            <Col span={12}>
              <Row>
                <Col>
                  <Title level={3}>{item.name}</Title>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Paragraph type="secondary" style={{ marginTop: '-10px' }}>
                    {dayjs(item.date).format(dateFormats.fullDate)}
                  </Paragraph>
                </Col>
              </Row>
            </Col>
            <Col span={4}>
              <Title level={4}>{item.value}</Title>
            </Col>
          </Row>
        ))}

        <Row style={{ marginTop: '50px' }}>
          <Calendar
            value={selectedDate}
            fullscreen={false}
            onSelect={onDateSelect}
            disabledDate={disableFutureDates}
          />
        </Row>
      </Col>
    </Row>
  )
}
