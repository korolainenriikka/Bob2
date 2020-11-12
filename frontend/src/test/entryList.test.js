import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import EntryList from '../components/EntryList'

test('list component renders all given entries as entry components', () => {
  const mockHandler = jest.fn()

  const entries = [
    {
      dateTime: '2020-11-12T10:06',
      content: 'A test entry',
      _id: 123
    },
    {
      dateTime: '2020-11-13T10:06',
      content: 'Another test entry',
      _id: 124
    }
  ]

  const component = render(
    <EntryList listOfEntries={entries} deleteEntry={mockHandler}/>
  )

  expect(component.container).toHaveTextContent(
    '12/11/2020 10:06: A test entry'
  )
  expect(component.container).toHaveTextContent(
    '13/11/2020 10:06: Another test entry'
  )
})