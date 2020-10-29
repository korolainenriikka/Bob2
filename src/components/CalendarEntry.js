import React from 'react'

const CalendarEntry = ({dateTime, content, id, deleteEntry}) => {
  return (
    <li>{dateTime}: {content} 
      
    </li>
  )
}

export default CalendarEntry