import React from 'react'
import { Menu, Row, Col, Typography } from 'antd'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { removeFromStorage } from 'utils/localStorage'

const { Title } = Typography

export const Nav = () => {
  const { t } = useTranslation()

  const logout = () => {
    removeFromStorage('access-token')
    window.location.reload()
  }

  const onLanguageChange = (lng: string) => {
    localStorage.setItem('language', lng)
    window.location.reload()
  }

  return (
    <Row align="middle" style={{ height: '100%' }}>
      <Col span={14}>
        <Title level={3} style={{ marginBottom: 0, color: '#fff' }}>
          ExpensesTracker
        </Title>
      </Col>

      <Col span={10} style={{ height: '100%' }}>
        <Menu mode="horizontal" theme="dark" style={{ height: '100%', display: 'flex' }}>
          <Menu.Item>
            <NavLink to="/">{t('overview')}</NavLink>
          </Menu.Item>
          <Menu.Item>
            <p onClick={logout}>{t('logout')}</p>
          </Menu.Item>
          <Menu.Item onClick={() => onLanguageChange('pl')}>PL</Menu.Item>
          <Menu.Item onClick={() => onLanguageChange('en')}>EN</Menu.Item>
        </Menu>
      </Col>
    </Row>
  )
}
