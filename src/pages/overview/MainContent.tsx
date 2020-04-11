import React, { useState } from 'react'
import { Row, Col, Typography, Button, Select } from 'antd'
import { PlusSquareFilled } from '@ant-design/icons'

import { LinearChart } from './LinearChart/LinearChart'
import { PieChart } from './PieChart/PieChart'
import { AddNewModal } from './AddNewModal/AddNewModal'

const { Title } = Typography
const { Option } = Select

export const MainContent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <AddNewModal
        isVisible={isModalOpen}
        onCancel={setIsModalOpen}
        onOk={setIsModalOpen}
        title="Add new"
      />

      <Row style={{ padding: '24px' }}>
        <Col span={18}>
          <Typography>
            <Title level={2}>April 2020</Title>
          </Typography>
        </Col>

        <Col span={6}>
          <Row type="flex" align="middle" justify="center">
            <Button
              style={{ fontWeight: 'bold' }}
              type="primary"
              value="large"
              onClick={() => setIsModalOpen(true)}
            >
              <PlusSquareFilled />
              Add new
            </Button>
          </Row>
        </Col>
      </Row>

      <Row type="flex" style={{ paddingLeft: '24px' }}>
        <Col span={6}>
          <Title level={3}>Expenses</Title>
          <Title level={4}>- 5000</Title>
        </Col>
        <Col span={6}>
          <Title level={3}>Revenus</Title>
          <Title level={4}>4000</Title>
        </Col>
        <Col span={6}>
          <Title level={3}>Total</Title>
          <Title level={4}>- 1000</Title>
        </Col>
        <Col span={6}>
          <Title level={3}>Display</Title>
          <Select defaultValue="month" style={{ width: '70%' }}>
            <Option value="year">Year</Option>
            <Option value="month">Month</Option>
            <Option value="week">Week</Option>
          </Select>
        </Col>
      </Row>

      <Row style={{ marginTop: '30px' }}>
        <Col span={13}>
          <LinearChart />
        </Col>
        <Col span={11}>
          <PieChart />
        </Col>
      </Row>
    </>
  )
}
