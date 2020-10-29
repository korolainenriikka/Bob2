import React, {useState} from 'react'

const CalendarForm = ({addNew}) => {
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [content, setContent] = useState('')

  const validDateRegex = RegExp(
    // validates DD/MM/YYYY
    /^(0?[1-9]|[12][0-9]|3[01])[/](0?[1-9]|1[012])[/]\d{4}$/
  )

  const validTimeRegex = RegExp(
    /([0-2][0-9]):([0-5][0-9])/
  )

  const validateForm = () => {
    if (validDateRegex.test(date) && validTimeRegex.test(time)){
      return true
    }
    return false
  }

  const addEntry = () => {
    if (validateForm()) {
      addNew(date, time, content)
    } else {
      window.alert('invalid input, insert date in form DD/MM/YYYY and time in HH:mm')
    }
  }

  return (
    <form onSubmit={addEntry}>
      <input
        onChange = {(event) => setDate(event.target.value)}
      />
      <input
        onChange = {(event) => setTime(event.target.value)}
      />
      <input
        onChange = {(event) => setContent(event.target.value)}
      />
      <button type="submit">add</button>
    </form>
  )
}

export default CalendarForm