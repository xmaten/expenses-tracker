import React, { useState, useContext } from 'react'
import { Modal, Row, Col, Typography, Select, Input, InputNumber } from 'antd'
import { v4 as uuidv4 } from 'uuid'
import dayjs from 'dayjs'
import { useTranslation } from 'react-i18next'

import Calendar from 'components/dataInput/Calendar'
import { store } from 'store/store'
import { addExpense } from 'store/expenses'
import { addIncome } from 'store/incomes'
import { disableFutureDates } from 'utils/disableFutureDates'

import styles from './style.module.css'

type Props = {
  title: string
  isVisible: boolean
  onOk: (isVisible: boolean) => void
  onCancel: (isVisible: boolean) => void
}

const { Title, Paragraph } = Typography
const { Option } = Select

export const AddNewModal: React.FC<Props> = ({ title, isVisible, onOk, onCancel }) => {
  const { dispatch } = useContext(store)
  const [nameVal, setNameVal] = useState('')
  const [typeVal, setTypeVal] = useState('expense')
  const [valueVal, setValueVal] = useState<number | undefined>(undefined)
  const [categoryVal, setCategoryVal] = useState('food')
  const [dateVal, setDateVal] = useState(dayjs())
  const [isBeingSubmitted, setIsBeingSubmitted] = useState(false)
  const { t } = useTranslation()

  const validate = () => {
    if (nameVal === '' || !valueVal) {
      return false
    }

    return true
  }

  const onDateSelect = (value: dayjs.Dayjs) => {
    setDateVal(value)
  }

  const onSubmit = () => {
    setIsBeingSubmitted(true)
    const isValid = validate()

    if (isValid) {
      if (typeVal === 'expense') {
        uuidv4()
        const baseData = {
          title: nameVal,
          value: valueVal,
          date: dateVal.toISOString(),
          category: categoryVal,
        }

        addExpense(baseData, dispatch)
        onOk(false)
      } else if (typeVal === 'income') {
        const baseData = {
          title: nameVal,
          value: valueVal,
          date: dateVal.toISOString(),
        }

        addIncome(baseData, dispatch)
        onOk(false)
      }
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
        <Row justify="space-between" data-testid="add-new-modal">
          <Col span={12}>
            <Title level={3}>{t('type')}</Title>
            <Select
              defaultValue={typeVal}
              onChange={(val: string) => setTypeVal(val)}
              className={styles.select}
            >
              <Option value="expense">{t('expense')}</Option>
              <Option value="income">{t('income')}</Option>
            </Select>
          </Col>
          <Col span={11}>
            <Title level={3}>{t('category')}</Title>
            <Select
              defaultValue={categoryVal}
              onChange={(val: string) => setCategoryVal(val)}
              className={styles.select}
            >
              <Option value="electronics">{t('electronics')}</Option>
              <Option value="credit">{t('credit')}</Option>
              <Option value="food">{t('food')}</Option>
              <Option value="entertainment">{t('entertainment')}</Option>
              <Option value="other">{t('other')}</Option>
            </Select>
          </Col>
        </Row>
        <Row className={styles.row} justify="space-between">
          <Col span={12}>
            <Title level={3}>{t('title')}</Title>
            <Input
              placeholder={t('typeHere')}
              name="name"
              value={nameVal}
              onChange={(e) => setNameVal(e.target.value)}
            />
          </Col>
          <Col span={11}>
            <Title level={3}>{t('value')}</Title>
            <InputNumber
              placeholder={t('typeHere')}
              className={styles.input}
              name="value"
              value={valueVal}
              onChange={(val) => setValueVal(val)}
            />
          </Col>
        </Row>

        <Row className={styles.row}>
          <Col span={24}>
            <Title level={3}>{t('date')}</Title>
            <Calendar
              fullscreen={false}
              value={dateVal}
              onSelect={onDateSelect}
              disabledDate={disableFutureDates}
            />
          </Col>
        </Row>
        {!validate() && isBeingSubmitted ? (
          <Row className={styles.error__wrapper}>
            <Paragraph className={styles.error__text}>{t('formNotValid')}</Paragraph>
          </Row>
        ) : null}
      </Modal>
    </form>
  )
}
