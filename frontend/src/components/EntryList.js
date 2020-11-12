import React from 'react'
import CalendarEntry from './CalendarEntry'

const EntryList = ({ listOfEntries, deleteEntry }) => (
  <table>
    <tbody>
      {listOfEntries.map(e =>
        <CalendarEntry
          key={e._id}
          dateTime={e.dateTime}
          content={e.content}
          id={e._id}
          deleteEntry={deleteEntry}
        />
      )}
    </tbody>
  </table>
)

export default EntryList