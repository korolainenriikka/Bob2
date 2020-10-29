import React from 'react'

const CalendarEntry = ({date, time, content, id, deleteEntry}) => {
  return (
    <li>{date}  {time}: {content} 
      <button onClick={() => deleteEntry(id)}>del</button>
    </li>
  )
}

export default CalendarEntry