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
        const sorted = calendar.sort(orderByTime)
        setCalendarEntries(sorted)
      })
  }, [])

  const orderByTime = (e1, e2) => {
    const dateString1 = e1.date.split("/").reverse().join("-");
    const ISOString1 = dateString1 + 'T' + e1.time + ':00'
    const date1 = Date.parse(ISOString1)

    const dateString2 = e2.date.split("/").reverse().join("-");
    const ISOString2 = dateString2 + 'T' + e2.time + ':00'
    const date2 = Date.parse(ISOString2)

    return date1 > date2
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
              key={c.id}
              date={c.date}
              time={c.time}
              content={c.content}
              id={c.id}
              deleteEntry={deleteEntry}
            />
          )}
      </ul>
      <CalendarFrom addNew={addNew}/>
    </div>
  )
}

export default Calendar