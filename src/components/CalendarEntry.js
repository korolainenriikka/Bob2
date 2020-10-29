import React from 'react'
import { ISOtoTimeString } from '../utils/timeConversion'

const CalendarEntry = ({dateTime, content, id, deleteEntry}) => {
  return (
    <li>
      {ISOtoTimeString(dateTime)}: {content}  
    </li>
  )
}

export default CalendarEntry