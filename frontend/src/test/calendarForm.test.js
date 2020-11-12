import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import CalendarForm from '../components/CalendarForm'

test('Form updates state and calls onSubmit', () => {
  const mockSubmit = jest.fn()

  const component = render(
    <CalendarForm addNew={mockSubmit} />
  )

  const dateInput = component.container.querySelector('.dateInput')
  const timeInput = component.container.querySelector('.timeInput')
  const contentInput = component.container.querySelector('.contentInput')

  const form = component.container.querySelector('form')

  fireEvent.change(dateInput, {
    target: { value: '2020-11-11' }
  })
  fireEvent.change(timeInput, {
    target: { value: '15:00' }
  })
  fireEvent.change(contentInput, {
    target: { value: 'yeaou form testing!' }
  })
  fireEvent.submit(form)

  expect(mockSubmit.mock.calls).toHaveLength(1)
  expect(mockSubmit.mock.calls[0][0]).toBe('2020-11-11')
  expect(mockSubmit.mock.calls[0][1]).toBe('15:00')
  expect(mockSubmit.mock.calls[0][2]).toBe('yeaou form testing!')
})