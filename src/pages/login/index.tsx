import React, { useContext, useEffect, useState } from 'react'
import { Form, Input, Button, Row, Col, Typography, Spin } from 'antd'
import { Link, useHistory } from 'react-router-dom'
import { useTranslation, Trans } from 'react-i18next'

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
  const { t } = useTranslation()

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
              return <p>{t('error')}</p>
            }

            return (
              <>
                {isInitialLogin && (
                  <Title style={{ textAlign: 'center' }} level={4}>
                    {t('accountCreated')}
                  </Title>
                )}
                <Form
                  {...layout}
                  name="basic"
                  initialValues={{ remember: true }}
                  onFinish={onFinish}
                >
                  <Form.Item
                    label={t('email')}
                    name="email"
                    rules={[{ required: true, message: t('emailRequired') }]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label={t('password')}
                    name="password"
                    rules={[{ required: true, message: t('passwordRequired') }]}
                  >
                    <Input.Password />
                  </Form.Item>

                  <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                      {t('login')}
                    </Button>
                  </Form.Item>
                </Form>

                <p className={styles.link}>
                  <Trans i18nKey="redirectToRegister">
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
