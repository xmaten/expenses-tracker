import React, { useContext, useEffect } from 'react'
import { Form, Input, Button, Row, Col, Typography, Spin } from 'antd'
import { Link, useHistory } from 'react-router-dom'
import { Trans, useTranslation } from 'react-i18next'

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
  const { t } = useTranslation()

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
              return <p>{t('error')}</p>
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
                    rules={[{ required: true, message: t('usernameRequired') }]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'emailRequired' }]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'passwordRequired' }]}
                  >
                    <Input.Password />
                  </Form.Item>

                  <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
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
