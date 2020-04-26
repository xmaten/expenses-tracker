import React, { useContext } from 'react'
import { Col, Modal, Row, Typography, Divider } from 'antd'

import { Expense } from 'api/expenses/expenses.model'
import { store } from 'store/store'

import styles from './style.module.css'

type Props = {
  title: string
  isVisible: boolean
  onOk: (isVisible: boolean) => void
  onCancel: (isVisible: boolean) => void
}

const { Title } = Typography

export const ExpensesFromGivenDayModal: React.FC<Props> = ({
  title,
  isVisible,
  onOk,
  onCancel,
}) => {
  const { state } = useContext(store)

  return (
    <Modal
      title={title}
      visible={isVisible}
      onOk={() => onOk(false)}
      onCancel={() => onCancel(false)}
      footer={null}
    >
      {state.expensesFromGivenDay.length === 0 && (
        <Row>
          <Col span={24}>
            <Title level={3} className={styles.header__title}>
              There are no expenses in this day
            </Title>
          </Col>
        </Row>
      )}
      {state.expensesFromGivenDay.map((item: Expense) => (
        <Row key={item.name} align="bottom">
          <Col span={12}>
            <Title type="secondary" level={4} className={styles.item__category}>
              {item.category}
            </Title>
            <Title level={3} className={styles.item__name}>
              {item.name}
            </Title>
          </Col>
          <Col span={12}>
            <Title level={3} className={styles.item__value}>
              {item.value} PLN
            </Title>
          </Col>
          <Divider />
        </Row>
      ))}
    </Modal>
  )
}
