import React from 'react'
import { Modal, Row, Col, Typography, Select, Input, InputNumber } from 'antd'

type Props = {
  title: string
  isVisible: boolean
  onOk: (isVisible: boolean) => void
  onCancel: (isVisible: boolean) => void
}

const { Title } = Typography
const { Option } = Select

export const AddNewModal: React.FC<Props> = ({ title, isVisible, onOk, onCancel }) => (
  <Modal
    title={title}
    visible={isVisible}
    onOk={() => onOk(false)}
    onCancel={() => onCancel(false)}
  >
    <Row type="flex" justify="space-between">
      <Col span={12}>
        <Title level={3}>Type</Title>
        <Select defaultValue="expense" style={{ width: '100%' }}>
          <Option value="expense">Expense</Option>
          <Option value="revenue">Revenue</Option>
        </Select>
      </Col>
      <Col span={11}>
        <Title level={3}>Category</Title>
        <Select defaultValue="electronics" style={{ width: '100%' }}>
          <Option value="electronics">Electronics</Option>
          <Option value="credit">Credit</Option>
          <Option value="food">Food</Option>
          <Option value="entertainment">Entertainment</Option>
          <Option value="other">Other</Option>
        </Select>
      </Col>
    </Row>
    <Row style={{ marginTop: '50px' }} type="flex" justify="space-between">
      <Col span={12}>
        <Title level={3}>Name</Title>
        <Input placeholder="Type here" />
      </Col>
      <Col span={11}>
        <Title level={3}>Value</Title>
        <InputNumber placeholder="Type here" style={{ width: '100%' }} />
      </Col>
    </Row>
  </Modal>
)
