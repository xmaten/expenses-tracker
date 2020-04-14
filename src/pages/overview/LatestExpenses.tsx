import React, { useContext } from 'react'
import { Row, Col, Typography, Avatar, Calendar } from 'antd'
import { compareDesc, format } from 'date-fns'

import { store } from 'store/store'
import { Expense } from 'api/expenses/expenses.model'

const { Title, Paragraph } = Typography

export const LatestExpenses = () => {
  const { state } = useContext(store)

  const getLatestExpenses = (data: Expense[]) => {
    return data.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date))).slice(0, 3)
  }

  return (
    <Row>
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
          <Calendar fullscreen={false} />
        </Row>
      </Col>
    </Row>
  )
}
