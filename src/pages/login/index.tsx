import React from 'react'
import { Form, Input, Button, Row, Col, Typography } from 'antd'

import styles from './style.module.css'
import { Link } from 'react-router-dom'

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
}
const tailLayout = {
  wrapperCol: { offset: 8, span: 8 },
}

const { Title } = Typography

export const Login = () => {
  const onFinish = (values: any) => {
    console.log('Success:', values)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <>
      <Row justify="center" className={styles.row}>
        <Title>Expenses Tracker</Title>
      </Row>
      <Row justify="center" className={styles.row}>
        <Col span={12}>
          <Form
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Email is required' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Password is required' }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>

          <p className={styles.link}>
            Don't have an account? <Link to="/login">Register here.</Link>
          </p>
        </Col>
      </Row>
    </>
  )
}