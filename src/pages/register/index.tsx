import React, { useContext, useEffect } from 'react'
import { Form, Input, Button, Row, Col, Typography, Spin } from 'antd'
import { Link, useHistory } from 'react-router-dom'

import { registerUser } from 'store/thunks'
import { store } from 'store/store'

import styles from './style.module.css'

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
}
const tailLayout = {
  wrapperCol: { offset: 8, span: 8 },
}

const { Title } = Typography

export const Register = () => {
  const { dispatch, state } = useContext(store)
  const history = useHistory()

  const onFinish = (values: any) => {
    registerUser(values, dispatch)
  }

  useEffect(() => {
    if (state.isSuccess) {
      history.push('/login?initialLogin=true')
    }
  }, [state.isSuccess])

  return (
    <>
      <Row justify="center" className={styles.row}>
        <Title>Expenses Tracker</Title>
      </Row>
      <Row justify="center" className={styles.row}>
        <Col span={12}>
          {(() => {
            if (state.isLoading) {
              return (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Spin />
                </div>
              )
            }

            if (state.isError) {
              return <p>There was an error. Please try again later</p>
            }

            return (
              <>
                <Form
                  {...layout}
                  name="basic"
                  initialValues={{ remember: true }}
                  onFinish={onFinish}
                >
                  <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Username is required' }]}
                  >
                    <Input />
                  </Form.Item>

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
                  Already registered? <Link to="/login">Login here.</Link>
                </p>
              </>
            )
          })()}
        </Col>
      </Row>
    </>
  )
}
