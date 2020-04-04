import React from 'react'
import { Layout } from 'antd'

const { Header, Sider, Content } = Layout

export const Overview = () => (
  <Layout>
    <Header>Header</Header>
    <Layout>
      <Content>Content</Content>
      <Sider>Sider</Sider>
    </Layout>
  </Layout>
)
