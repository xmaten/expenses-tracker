import React from 'react'
import { Layout } from 'antd'

import { Nav } from 'components/nav/Nav'

import { LatestExpenses } from './overview/LatestExpenses'
import { MainContent } from './overview/MainContent'

const { Header, Sider, Content } = Layout

export const Overview = () => {
  return (
    <Layout>
      <Header>
        <Nav />
      </Header>
      <Layout>
        <Content>
          <MainContent />
        </Content>
        <Sider theme="light" width={350}>
          <LatestExpenses />
        </Sider>
      </Layout>
    </Layout>
  )
}
