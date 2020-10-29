import React from 'react'
import EntryList from './EntryList'

const Today = ({ calendarEntries }) => {
  const today = new Date(Date.now())

  const todaysCal = calendarEntries.filter(e => {
    const dateTime = new Date(Date.parse(e.dateTime))

    return (
        dateTime.getDate() === today.getDate()
      && dateTime.getMonth() === today.getMonth()
      && dateTime.getFullYear() === today.getFullYear()
    )
})

  return(
    <div>
      <h1>heips moips päivän jutut:</h1>
      <EntryList listOfEntries={todaysCal}/>
    </div>
  )
}

export default Today