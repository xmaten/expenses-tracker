import React from 'react'
import { Modal } from 'antd'

type Props = {
  title: string
  isVisible: boolean
  onOk: (isVisible: boolean) => void
  onCancel: (isVisible: boolean) => void
}

export const ExpensesFromGivenDay: React.FC<Props> = ({ title, isVisible, onOk, onCancel }) => {
  return (
    <Modal
      title={title}
      visible={isVisible}
      onOk={() => onOk(false)}
      onCancel={() => onCancel(false)}
    >
      <p>Expenses</p>
    </Modal>
  )
}
