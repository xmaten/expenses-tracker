import React, { useContext } from 'react'
import { Form, Input, Button, Row, Col, Typography, Spin } from 'antd'
import { Link } from 'react-router-dom'
import { Trans, useTranslation } from 'react-i18next'

import { registerUser } from 'store/auth'
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
  const { t } = useTranslation()

  const onFinish = (values: any) => {
    registerUser(values, dispatch)
  }

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

            return (
              <>
                {state.errorMessage && <p>{t(state.errorMessage)}</p>}
                <Form
                  {...layout}
                  name="basic"
                  initialValues={{ remember: true }}
                  onFinish={onFinish}
                >
                  <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: t('usernameRequired') }]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: t('emailRequired') }]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: t('passwordRequired') }]}
                  >
                    <Input.Password />
                  </Form.Item>

                  <Form.Item
                    name="repeatPassword"
                    label="Repeat password"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        message: t('passwordRequired'),
                      },
                      ({ getFieldValue }) => ({
                        validator(rule, value) {
                          if (!value || getFieldValue('password') === value) {
                            return Promise.resolve()
                          }
                          return Promise.reject(t('passwordsMustBeTheSame'))
                        },
                      }),
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>

                  <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit" data-testid="submit-btn">
                      {t('register')}
                    </Button>
                  </Form.Item>
                </Form>

                <p className={styles.link}>
                  <Trans i18nKey="redirectToLogin">
                    0<Link to="/register">1</Link>
                  </Trans>
                </p>
              </>
            )
          })()}
        </Col>
      </Row>
    </>
  )
}
