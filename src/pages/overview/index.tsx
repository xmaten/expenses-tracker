import React, { useEffect, useContext, useState } from 'react'
import { Alert, Button, Layout, Spin } from 'antd'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'

import { Nav } from 'components/nav/Nav'
import { store } from 'store/store'
import { getExpenses, getIncomes } from 'store/thunks'
import { filterDataForChosenMonth } from 'utils/filterDataForChosenMonth'
import { ActionTypes } from 'store/actionTypes'

import { LatestExpenses } from './components/LatestExpenses'
import { MainContent } from './components/MainContent'
import styles from './style.module.css'

const { Header, Sider, Content } = Layout

export const Overview = () => {
  const { dispatch, state } = useContext(store)
  const [siderCollapsed, setSiderCollapsed] = useState(true)
  const { t } = useTranslation()

  useEffect(() => {
    getExpenses(dispatch)
    getIncomes(dispatch)
  }, [dispatch, state.chosenMonth])

  useEffect(() => {
    const expensesForChosenMonth = filterDataForChosenMonth(state.expenses, state.chosenMonth)
    const incomesForChosenMonth = filterDataForChosenMonth(state.incomes, state.chosenMonth)

    dispatch({ type: ActionTypes.SET_EXPENSES_FOR_CHOSEN_MONTH, payload: expensesForChosenMonth })
    dispatch({ type: ActionTypes.SET_INCOMES_FOR_CHOSEN_MONTH, payload: incomesForChosenMonth })
  }, [state.expenses, state.incomes])

  return (
    <Layout>
      <Header>
        <Nav />
      </Header>
      <Layout className={styles.layout}>
        {state.isError ? <Alert message={t('error')} type="error" /> : null}

        {state.isLoading ? (
          <Spin data-testid="overview-spinner" className={styles.spin} />
        ) : (
          <>
            <Content>
              <MainContent />
            </Content>
            <Button
              className={[
                styles.siderToggleButton,
                siderCollapsed ? styles.siderToggleButtonCollapsed : '',
              ].join(' ')}
              onClick={() => setSiderCollapsed(!siderCollapsed)}
            >
              {siderCollapsed ? <LeftOutlined /> : <RightOutlined />}
            </Button>
            <Sider
              theme="light"
              width={350}
              className={[styles.sider, siderCollapsed ? styles.siderCollapsed : 'test'].join(' ')}
            >
              <LatestExpenses />
            </Sider>
          </>
        )}
      </Layout>
    </Layout>
  )
}
