import React from 'react'
import { Row, Col, Typography, Avatar, Calendar } from 'antd'

const { Title, Paragraph } = Typography

const expensesList = [
  {
    id: 1,
    name: 'Camera',
    date: '23.04.2020',
    price: '1500',
  },
  {
    id: 2,
    name: 'Bike',
    date: '19.02.2020',
    price: '3000',
  },
  {
    id: 3,
    name: 'TV',
    date: '12.12.2019',
    price: '3500',
  },
]

export const LatestExpenses = () => (
  <Row>
    <Col span={24} style={{ padding: '24px' }}>
      <Typography>
        <Title level={2}>Latest expenses</Title>
      </Typography>

      {expensesList.map((item) => (
        <Row style={{ marginTop: '50px' }} key={item.id}>
          <Col span={4}>
            <Avatar shape="square" size={64} />
          </Col>
          <Col span={16}>
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
