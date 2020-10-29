import React from 'react'
import CalendarEntry from './CalendarEntry'

const EntryList = ({ listOfEntries }) => (
  <ul>
    {listOfEntries.map(e => 
      <CalendarEntry
        key={e._id}
        dateTime={e.dateTime}
        content={e.content}
      />
    )}
  </ul>
)

export default EntryList