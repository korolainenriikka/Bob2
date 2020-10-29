import React from 'react'

const CalendarEntry = ({date, time, content, id, deleteEntry}) => {
  return (
    <li>{date}  {time}: {content} 
      
    </li>
  )
}

export default CalendarEntry