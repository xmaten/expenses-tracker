import React, { useEffect, useContext } from 'react'
import { Layout } from 'antd'

import { Nav } from 'components/nav/Nav'
import { ActionTypes } from 'store/actionTypes'
import { ExpensesApi } from 'api/expenses'
import { store } from 'store/store'

import { LatestExpenses } from './overview/LatestExpenses'
import { MainContent } from './overview/MainContent'

const { Header, Sider, Content } = Layout

export const Overview = () => {
  const { dispatch } = useContext(store)

  useEffect(() => {
    const getExpenses = async () => {
      const { data } = await ExpensesApi.getExpenses()
      const notNullValues = data.filter((item) => item)

      dispatch({ type: ActionTypes.GET_EXPENSES, payload: notNullValues })
    }

    getExpenses()
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
