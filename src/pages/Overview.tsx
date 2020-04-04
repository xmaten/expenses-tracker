import React from 'react'
import { Layout } from 'antd'

import { Nav } from 'components/nav/Nav'

const { Header, Sider, Content } = Layout

export const Overview = () => (
  <Layout>
    <Header>
      <Nav />
    </Header>
    <Layout>
      <Content>Content</Content>
      <Sider>Sider</Sider>
    </Layout>
  </Layout>
)
