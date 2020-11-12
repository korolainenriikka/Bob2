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
      <img alt="today" className="tanaan" src={require('../images/tanaan.jpg')}/>
      <EntryList listOfEntries={todaysCal}/>
      <img alt="logo" className="boblogo" src={require('../images/theworldwidebob.jpg')}/>
    </div>
  )
}

export default Today