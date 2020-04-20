import React, { useContext, useState } from 'react'
import { Row, Col, Typography, Avatar } from 'antd'
import { compareDesc, format } from 'date-fns'

import Calendar from 'components/dataInput/Calendar'
import { store } from 'store/store'
import { Expense } from 'api/expenses/expenses.model'
import { disableFutureDates } from '../../utils/disableFutureDates'
import dayjs, { Dayjs } from 'dayjs'
import { ExpensesFromGivenDay } from './ExpensesFromGivenDayModal/ExpensesFromGivenDay'

const { Title, Paragraph } = Typography

export const LatestExpenses = () => {
  const [isExpensesModalVisible, setIsExpensesModalVisible] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs())
  const { state } = useContext(store)

  const getLatestExpenses = (data: Expense[]) => {
    return data.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date))).slice(0, 3)
  }

  const onDateSelect = (value: dayjs.Dayjs) => {
    setIsExpensesModalVisible(true)
    setSelectedDate(value)
  }

  return (
    <Row>
      <ExpensesFromGivenDay
        title={`Expenses from ${dayjs(selectedDate).format('DD.MM.YYYY')}`}
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
                    {format(new Date(item.date), 'MM-dd-yyyy')}
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
