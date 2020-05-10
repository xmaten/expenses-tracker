import React from 'react'
import { Menu, Row, Col, Typography } from 'antd'
import { NavLink } from 'react-router-dom'

import { removeFromStorage } from 'utils/localStorage'

const { Title } = Typography

export const Nav = () => {
  const logout = () => {
    removeFromStorage('access-token')
    window.location.reload()
  }

  return (
    <Row align="middle" style={{ height: '100%' }}>
      <Col span={16}>
        <Title level={3} style={{ marginBottom: 0, color: '#fff' }}>
          ExpensesTracker
        </Title>
      </Col>

      <Col span={8}>
        <Menu mode="horizontal" theme="dark">
          <Menu.Item>
            <NavLink to="/">Overview</NavLink>
          </Menu.Item>
          <Menu.Item>
            <NavLink to="/calendar">Calendar</NavLink>
          </Menu.Item>
          <Menu.Item>
            <NavLink to="/reports">Reports</NavLink>
          </Menu.Item>
          <Menu.Item>
            <p onClick={logout}>Logout</p>
          </Menu.Item>
        </Menu>
      </Col>
    </Row>
  )
}
