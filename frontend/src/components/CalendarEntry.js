import React from 'react'
import { ISOtoTimeString } from '../utils/timeConversion'

const CalendarEntry = ({ dateTime, content, id, deleteEntry }) => {
  if (!deleteEntry) {
    // today-view has no deleting functionality
    return (
      <tr>
        <td className='listedItem'>{ISOtoTimeString(dateTime)}: {content}</td>
      </tr>
    )
  } else {
    return (
      <tr>
        <td className='listedItem'>{ISOtoTimeString(dateTime)}: {content}</td>
        <td><button className='otherbutton' onClick={() => deleteEntry(id)}>
          <img alt='trashicon' src={require('../images/trash_icon.png')} />
        </button>
        </td>
      </tr>
    )
  }
}

export default CalendarEntry