import React, { useEffect, useContext } from 'react'
import { Layout } from 'antd'

import { Nav } from 'components/nav/Nav'
import { ActionTypes } from 'store/actionTypes'
import { store } from 'store/store'
import { getExpenses, getRevenues } from 'store/thunks'

import { LatestExpenses } from './overview/LatestExpenses'
import { MainContent } from './overview/MainContent'

const { Header, Sider, Content } = Layout

export const Overview = () => {
  const { dispatch } = useContext(store)

  useEffect(() => {
    const getData = async () => {
      const expenses = await getExpenses()
      const revenues = await getRevenues()

      dispatch({ type: ActionTypes.GET_EXPENSES, payload: expenses })
      dispatch({ type: ActionTypes.GET_REVENUES, payload: revenues })
    }

    getData()
  }, [dispatch])

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
