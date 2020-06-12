import React, { useContext } from 'react'
import { Col, Modal, Row, Typography, Divider } from 'antd'
import { useTranslation } from 'react-i18next'

import { store } from 'store/store'
import { Expense } from 'api/expenses/expenses.model'

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
  const { t } = useTranslation()

  return (
    <Modal
      title={title}
      visible={isVisible}
      onOk={() => onOk(false)}
      onCancel={() => onCancel(false)}
      footer={null}
    >
      {state.expenses.fromGivenDay.length === 0 && (
        <Row>
          <Col span={24}>
            <Title level={3} className={styles.header__title}>
              {t('noExpensesForDay')}
            </Title>
          </Col>
        </Row>
      )}
      {state.expenses.fromGivenDay.map((item: Expense) => (
        <Row key={item.id} align="bottom">
          <Col span={12}>
            <Title type="secondary" level={4} className={styles.item__category}>
              {item.category}
            </Title>
            <Title level={3} className={styles.item__name}>
              {item.title}
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
