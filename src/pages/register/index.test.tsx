import React from 'react'
import { fireEvent, waitFor, screen } from '@testing-library/react'

import * as AuthApi from 'api/auth/auth'
import { renderWithRouter } from 'utils/testUtils/renderWithRouter'

import { Register } from './index'

jest.mock('api/auth/auth')

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

describe('Register page', () => {
  test('It should display error if one of the fields is missing', async () => {
    const { getByText } = renderWithRouter(<Register />)

    fireEvent.click(getByText(/register/i))

    await waitFor(() => {
      expect(screen.getByText('usernameRequired')).not.toBeNull()
      expect(screen.getByText('emailRequired')).not.toBeNull()
      expect(screen.getByText('passwordRequired')).not.toBeNull()
    })
  })

  // test('It should call register method if form is filled', async () => {
  //   const { getByText, getByLabelText } = renderWithRouter(<Register />)
  //
  //   fireEvent.change(getByLabelText(/username/i), { target: { value: 'test' } })
  //   fireEvent.change(getByLabelText(/email/i), { target: { value: 'test' } })
  //   fireEvent.change(getByLabelText(/password/i), { target: { value: 'test' } })
  //
  //   fireEvent.click(getByText(/register/i))
  //
  //   const mockRegister = jest.spyOn(AuthApi, 'register')
  //
  //   expect(mockRegister).toHaveBeenCalledTimes(1)
  // })
})
