import React, { useContext, useEffect, useState } from 'react'
import { Row, Col, Typography, Avatar } from 'antd'
import { useTranslation } from 'react-i18next'
import plPL from 'antd/es/date-picker/locale/pl_PL'
import enGB from 'antd/es/date-picker/locale/en_GB'
import dayjs, { Dayjs } from 'dayjs'

import Calendar from 'components/dataInput/Calendar'
import { store } from 'store/store'
import { Expense } from 'api/expenses/expenses.model'
import { disableFutureDates } from 'utils/disableFutureDates'
import { dateFormats } from 'utils/dateFormats'
import { ExpensesActionTypes } from 'store/expenses'

import { ExpensesFromGivenDayModal } from './components/ExpensesFromGivenDayModal'
import styles from './style.module.css'

const { Title, Paragraph } = Typography

export const LatestExpenses = () => {
  const [isExpensesModalVisible, setIsExpensesModalVisible] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs())
  const { state, dispatch } = useContext(store)
  const { t } = useTranslation()

  const getLatestExpenses = (data: Expense[]) => {
    return data.sort((a, b) => dayjs(b.date).diff(a.date)).slice(0, 3)
  }

  const onDateSelect = (value: dayjs.Dayjs) => {
    setSelectedDate(value)
    setIsExpensesModalVisible(true)
  }

  useEffect(() => {
    const sameDayExpenses = state.expenses.all.filter((item: Expense) =>
      dayjs(item.date).isSame(selectedDate, 'day'),
    )

    dispatch({ type: ExpensesActionTypes.SET_EXPENSES_FROM_GIVEN_DAY, payload: sameDayExpenses })
  }, [selectedDate])

  return (
    <Row>
      <ExpensesFromGivenDayModal
        title={`${t('expensesFrom')} ${dayjs(selectedDate).format(dateFormats.fullDate)}`}
        isVisible={isExpensesModalVisible}
        onOk={setIsExpensesModalVisible}
        onCancel={setIsExpensesModalVisible}
      />
      <Col span={24} className={styles.header__title}>
        <Typography>
          <Title level={2}>{t('latestExpenses')}</Title>
        </Typography>

        {getLatestExpenses(state.expenses.all).map((item) => (
          <Row className={styles.expenseItem} key={item.id}>
            <Col span={6}>
              <Avatar shape="square" size={64} />
            </Col>
            <Col span={12}>
              <Row>
                <Col>
                  <Title level={3}>{item.title}</Title>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Paragraph type="secondary" className={styles.expenseItem__date}>
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

        <Row className={styles.calendarWrapper}>
          <Calendar
            locale={localStorage.getItem('language') === 'pl' ? plPL : enGB}
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
