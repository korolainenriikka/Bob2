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

  const parseToISO = (date, time) => {
    const day = date.split('/')[0]
    const month = date.split('/')[1]
    const year = date.split('/')[2]

    const hours = time.split(':')[0]
    const minutes = time.split(':')[1]

    return new Date(Date.parse(`${year}-${month}-${day}T${hours}:${minutes}`))
  }

  const addNew = (date, time, content) => {
    const dateTime = parseToISO(date, time)

    const objectToAdd = {
      dateTime: dateTime,
      content: content
    }

    calendarService
      .addNew(objectToAdd)
      .then((response) => {
        setCalendarEntries(calendarEntries.concat(response))
      })
      .catch((error) => {
        window.alert(`virhe: ${error}`)
      })
  }
  console.log(calendarEntries)

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
      <ul>
          {calendarEntries.map(c => 
            <CalendarEntry
              key={c._id}
              dateTime={c.dateTime}
              content={c.content}
            />
          )}
      </ul>
    </div>
  )
}

export default Calendar