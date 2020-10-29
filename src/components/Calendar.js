import React, {useState, useEffect} from 'react'
import calendarService from '../services/calendarService'

import CalendarFrom from './CalendarForm'
import { timeStringToISO } from '../utils/timeConversion'
import EntryList from './EntryList'

const Calendar = () => {
  const [calendarEntries, setCalendarEntries] = useState([])

  useEffect(() => {
    calendarService
      .getAll()
      .then((calendar) => {
        deleteOldEntries(calendar)
        setCalendarEntries(calendar.sort(sortByTime))
      })
  }, [])

  const deleteOldEntries = (calendar) => {
    calendar.forEach(entry => {
      if (Date.parse(entry.dateTime) < Date.now()) {
        calendarService.remove(entry._id)
      }
    })
  }

  const sortByTime = (e1,e2) => {
    if (e1.dateTime < e2.dateTime){
      return -1
    } else if (e1.dateTime > e2.dateTime){
      return 1
    } else {
      return 0
    }
  }

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
      .then((deletedObject) => {
        setCalendarEntries(calendarEntries.filter(c => c.id !== deletedObject.id))
      })
  }

  return (
    <div>
      <h2>lisää</h2>
      <CalendarFrom addNew={addNew}/>
      <h1>Muista!</h1>
      <EntryList listOfEntries={calendarEntries} />
    </div>
  )
}

export default Calendar