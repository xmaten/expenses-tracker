import React from 'react'
import { Menu, Row, Col } from 'antd'
import { NavLink } from 'react-router-dom'

export const Nav = () => (
  <Row type="flex" align="middle">
    <Col span={16}>
      <NavLink to="/">ExpensesTracker</NavLink>
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
      </Menu>
    </Col>
  </Row>
)
