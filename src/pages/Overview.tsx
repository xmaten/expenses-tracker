import React, { useEffect, useContext } from 'react'
import { Alert, Layout, Spin } from 'antd'

import { Nav } from 'components/nav/Nav'
import { store } from 'store/store'

import { LatestExpenses } from './overview/LatestExpenses'
import { MainContent } from './overview/MainContent'
import { getExpenses, getIncomes } from '../store/thunks'
import { fitlerDataForChosenMonth } from '../utils/fitlerDataForChosenMonth'
import { ActionTypes } from '../store/actionTypes'

const { Header, Sider, Content } = Layout

export const Overview = () => {
  const { dispatch, state } = useContext(store)

  useEffect(() => {
    getExpenses(dispatch)
    getIncomes(dispatch)
  }, [dispatch, state.chosenMonth])

  useEffect(() => {
    const expensesForChosenMonth = fitlerDataForChosenMonth(state.expenses, state.chosenMonth)
    const incomesForChosenMonth = fitlerDataForChosenMonth(state.incomes, state.chosenMonth)

    dispatch({ type: ActionTypes.SET_EXPENSES_FOR_CHOSEN_MONTH, payload: expensesForChosenMonth })
    dispatch({ type: ActionTypes.SET_INCOMES_FOR_CHOSEN_MONTH, payload: incomesForChosenMonth })
  }, [state.expenses, state.incomes])

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
