import React from 'react'
import calendarService from '../services/calendarService'

import CalendarFrom from './CalendarForm'
import { timeStringToISO } from '../utils/timeConversion'
import EntryList from './EntryList'

const Calendar = ({ calendarEntries, setCalendarEntries, sortByTime }) => {
  const addNew = (date, time, content) => {
    const dateTime = timeStringToISO(date, time)

    const objectToAdd = {
      dateTime: dateTime,
      content: content
    }

    calendarService
      .addNew(objectToAdd)
      .then((response) => {
        setCalendarEntries(calendarEntries.concat(response).sort(sortByTime))
      })
      .catch((error) => {
        window.alert(`virhe: ${error}`)
      })
  }

  const deleteEntry = (id) => {
    calendarService
      .remove(id)
      .then(() => {
        setCalendarEntries(calendarEntries.filter(c => c._id !== id))
      })
  }

  return (
    <div>
      <h2>lisää</h2>
      <CalendarFrom addNew={addNew}/>
      <h1>Muista!</h1>
      <EntryList
        listOfEntries={calendarEntries}
        deleteEntry={deleteEntry}
      />
    </div>
  )
}

export default Calendar