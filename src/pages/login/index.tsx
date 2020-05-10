import React, { useContext, useEffect, useState } from 'react'
import { Form, Input, Button, Row, Col, Typography, Spin } from 'antd'
import { Link, useHistory } from 'react-router-dom'

import { store } from 'store/store'
import { loginUser } from 'store/thunks'

import styles from './style.module.css'

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
}
const tailLayout = {
  wrapperCol: { offset: 8, span: 8 },
}

const { Title } = Typography

export const Login = () => {
  const [isInitialLogin, setIsInitialLogin] = useState(false)
  const { dispatch, state } = useContext(store)
  const history = useHistory()

  const onFinish = (values: any) => {
    loginUser(values, dispatch)
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const initialLogin = urlParams.get('initialLogin')

    if (initialLogin) {
      setIsInitialLogin(true)
    }
  }, [])

  useEffect(() => {
    if (state.isSuccess) {
      history.push('/overview')
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
                {isInitialLogin && (
                  <Title style={{ textAlign: 'center' }} level={4}>
                    Your account has been created. You can login now!
                  </Title>
                )}
                <Form
                  {...layout}
                  name="basic"
                  initialValues={{ remember: true }}
                  onFinish={onFinish}
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
              </>
            )
          })()}
        </Col>
      </Row>
    </>
  )
}
