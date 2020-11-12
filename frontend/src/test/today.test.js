import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Today from '../components/Today'

test('today component renders only the entries of a given day', () => {
  const today = new Date(Date.parse('2020-11-11T12:00'))

  const entries = [
    {
      dateTime: '2020-11-12T00:00',
      content: 'A next days entry',
      _id: 123
    },
    {
      dateTime: '2020-11-10T23:59',
      content: 'Entry from the day before',
      _id: 124
    },
    {
      dateTime: '2021-11-11T00:00',
      content: 'Entry from the same date next year',
      _id: 125
    },
    {
      dateTime: '2020-11-11T23:59',
      content: 'This happens today',
      _id: 124
    }
  ]

  const component = render(
    <Today calendarEntries={entries} today={today}/>
  )

  expect(component.container).toHaveTextContent(
    '11/11/2020 23:59: This happens today'
  )
  expect(component.container).not.toHaveTextContent(
    '12/11/2020 00:00: A next days entry'
  )
  expect(component.container).not.toHaveTextContent(
    '10/11/2020 23:59: Entry from the day before'
  )
  expect(component.container).not.toHaveTextContent(
    '11/11/2021 00:00: Entry from the same date next year'
  )
})