import React, { useEffect, useContext } from 'react'
import { Row, Col, Typography, Avatar, Calendar } from 'antd'

import { ExpensesApi } from 'api/expenses'
import { store } from 'store/store'
import { ActionTypes } from 'store/actionTypes'

const { Title, Paragraph } = Typography

export const LatestExpenses = () => {
  const { state, dispatch } = useContext(store)

  useEffect(() => {
    const getExpenses = async () => {
      const { data } = await ExpensesApi.getExpenses()
      const notNullValues = data.filter((item: any) => item)

      dispatch({ type: ActionTypes.GET_EXPENSES, payload: notNullValues })
    }

    getExpenses()
  }, [dispatch])

  return (
    <Row>
      <Col span={24} style={{ padding: '24px' }}>
        <Typography>
          <Title level={2}>Latest expenses</Title>
        </Typography>

        {state.expenses.map((item: any) => (
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
                    {item.date}
                  </Paragraph>
                </Col>
              </Row>
            </Col>
            <Col span={4}>
              <Title level={4}>{item.price}</Title>
            </Col>
          </Row>
        ))}

        <Row style={{ marginTop: '50px' }}>
          <Calendar fullscreen={false} />
        </Row>
      </Col>
    </Row>
  )
}
