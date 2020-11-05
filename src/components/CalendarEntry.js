import React from 'react'
import { ListedItem } from '../styles/styledComponents'
import { ISOtoTimeString } from '../utils/timeConversion'

const CalendarEntry = ({dateTime, content, id, deleteEntry}) => {
  return (
    <tr>
      <ListedItem>{ISOtoTimeString(dateTime)}:</ListedItem>
      <ListedItem>{content}</ListedItem>
      <td><button onClick={() => deleteEntry(id)}>poista</button></td>
    </tr>
  )
}

export default CalendarEntry