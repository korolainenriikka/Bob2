import React from 'react'
import { ISOtoTimeString } from '../utils/timeConversion'

const CalendarEntry = ({dateTime, content, id, deleteEntry}) => {
  return (
    <tr>
      <td>{ISOtoTimeString(dateTime)}:</td>
      <td>{content}</td>
      <td><button onClick={() => deleteEntry(id)}>poista</button></td>
    </tr>
  )
}

export default CalendarEntry