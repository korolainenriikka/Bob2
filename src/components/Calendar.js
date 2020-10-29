import React, {useState, useEffect} from 'react'
import calendarService from '../services/calendarService'
import CalendarEntry from './CalendarEntry'
import CalendarFrom from './CalendarForm'

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
    const objectToAdd = {
      date: date,
      time: time,
      content: content
    }
    console.log('lisätään')
    console.log(objectToAdd)

    calendarService
      .addNew(objectToAdd)
      .then((response) => {
        console.log(response)
        setCalendarEntries(calendarEntries.concat(response.data))
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
      <h1>Muista!</h1>
      <ul>
          {calendarEntries.map(c => 
            <CalendarEntry
              key={c._id}
              date={c.date}
              time={c.time}
              content={c.content}
            />
          )}
      </ul>
    </div>
  )
}

export default Calendar