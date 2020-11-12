import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import CalendarEntry from '../components/CalendarEntry'

test('entry with undef deletion renders only string', () => {
  const entry = {
    dateTime: '2020-11-12T10:06',
    content: 'A test entry',
    id: 123,
    deleteEntry: undefined
  }

  const component = render(
    <table>
      <tbody>
        <CalendarEntry
          dateTime = {entry.dateTime}
          content = {entry.content}
          id = {entry.id}
          deleteEntry = {entry.deleteEntry}
        />
      </tbody>
    </table>
  )

  expect(component.container).toHaveTextContent(
    '12/11/2020 10:06: A test entry'
  )

  const Button = component.container.querySelector('button')
  expect(Button).toBe(null)
})

test('entry with deleting function renders string and a functioning deleting button', () => {
  const mockHandler = jest.fn()

  const entry = {
    dateTime: '2020-11-12T10:06',
    content: 'A test entry',
    id: 123,
    deleteEntry: mockHandler
  }

  const component = render(
    <table>
      <tbody>
        <CalendarEntry
          dateTime = {entry.dateTime}
          content = {entry.content}
          id = {entry.id}
          deleteEntry = {entry.deleteEntry}
        />
      </tbody>
    </table>
  )

  expect(component.container).toHaveTextContent(
    '12/11/2020 10:06: A test entry'
  )

  const Button = component.container.querySelector('button')
  fireEvent.click(Button)

  expect(Button).not.toBe(null)
  expect(mockHandler.mock.calls).toHaveLength(1)
})