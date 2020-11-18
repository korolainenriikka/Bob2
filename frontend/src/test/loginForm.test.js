import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import LoginForm from '../components/LoginForm'

test('Form updates state and calls onSubmit', () => {
  const mockSubmit = jest.fn()

  const component = render(
    <LoginForm login={mockSubmit} />
  )

  const usernameInput = component.container.querySelector('.usernameInput')
  const passwordInput = component.container.querySelector('.passwordInput')

  const form = component.container.querySelector('form')

  fireEvent.change(usernameInput, {
    target: { value: 'testusername' }
  })
  fireEvent.change(passwordInput, {
    target: { value: 'testpassword' }
  })
  fireEvent.submit(form)

  expect(mockSubmit.mock.calls).toHaveLength(1)
  expect(mockSubmit.mock.calls[0][0]).toBe('testusername')
  expect(mockSubmit.mock.calls[0][1]).toBe('testpassword')
})