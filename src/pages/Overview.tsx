import React, { useEffect, useContext } from 'react'
import { Alert, Layout, Spin } from 'antd'

import { Nav } from 'components/nav/Nav'
import { store } from 'store/store'

import { LatestExpenses } from './overview/LatestExpenses'
import { MainContent } from './overview/MainContent'
import { getExpenses, getRevenues } from '../store/thunks'

const { Header, Sider, Content } = Layout

export const Overview = () => {
  const { dispatch, state } = useContext(store)

  useEffect(() => {
    getExpenses(dispatch)
    getRevenues(dispatch)
  }, [dispatch])

  return (
    <Layout>
      <Header>
        <Nav />
      </Header>
      <Layout style={{ minHeight: 'calc(100vh - 64px)' }}>
        {state.isError ? <Alert message="There was an error" type="error" /> : null}

        {state.isLoading ? (
          <Spin style={{ marginTop: '50px' }} />
        ) : (
          <>
            <Content>
              <MainContent />
            </Content>
            <Sider theme="light" width={350}>
              <LatestExpenses />
            </Sider>
          </>
        )}
      </Layout>
    </Layout>
  )
}
