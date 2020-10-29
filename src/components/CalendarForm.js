import React, {useState} from 'react'

const CalendarForm = ({ addNew }) => {
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

  const addEntry = (event) => {
    event.preventDefault()

    if (validateForm()) {
      setDate('')
      setTime('')
      setContent('')
      addNew(date, time, content)
    } else {
      window.alert('virhe, ilmoita pvm muodossa pp/kk/vvvv ja aika muodossa tt:mm')
    }
  }

  return (
    <form onSubmit={addEntry}>
      <div>
        pvm:
        <input
          value = {date}
          onChange = {(event) => setDate(event.target.value)}
        />
      </div>
      <div>
        aika:
        <input
          value = {time}
          onChange = {(event) => setTime(event.target.value)}
        />
      </div>
      <div>
        kuvaus:
        <input
          value = {content}
          onChange = {(event) => setContent(event.target.value)}
        />
      </div>
      <button type="submit">add</button>
    </form>
  )
}

export default CalendarForm