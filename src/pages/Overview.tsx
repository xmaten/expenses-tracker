import React, { useEffect, useContext } from 'react'
import { Alert, Layout, Spin } from 'antd'

import { Nav } from 'components/nav/Nav'
import { ActionTypes } from 'store/actionTypes'
import { store } from 'store/store'
import { getExpenses, getRevenues } from 'store/thunks'

import { LatestExpenses } from './overview/LatestExpenses'
import { MainContent } from './overview/MainContent'

const { Header, Sider, Content } = Layout

export const Overview = () => {
  const { dispatch, state } = useContext(store)

  useEffect(() => {
    const getData = async () => {
      dispatch({ type: ActionTypes.GET_DATA_START })
      try {
        const expenses = await getExpenses()
        const revenues = await getRevenues()

        dispatch({ type: ActionTypes.GET_EXPENSES, payload: expenses })
        dispatch({ type: ActionTypes.GET_REVENUES, payload: revenues })
      } catch {
        dispatch({ type: ActionTypes.GET_DATA_ERROR })
      }
    }

    getData()
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
