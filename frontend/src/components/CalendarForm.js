import React, { useState } from 'react'
import { Form , Button } from 'react-bootstrap'

const CalendarForm = ({ addNew }) => {
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [content, setContent] = useState('')

  const addEntry = (event) => {
    event.preventDefault()

    setDate('')
    setTime('')
    setContent('')
    addNew(date, time, content)
  }

  return (
    <Form onSubmit={addEntry} >
      <Form.Group className="formGroup">
        <Form.Label>Pvm</Form.Label>
        <Form.Control
          className="dateInput"
          size="sm"
          type="date"
          value = {date}
          onChange = {(event) => setDate(event.target.value)}
        />
      </Form.Group>

      <Form.Group className="formGroup">
        <Form.Label>Aika</Form.Label>
        <Form.Control
          className="timeInput"
          size="sm"
          type="time"
          value = {time}
          onChange = {(event) => setTime(event.target.value)}
        />
      </Form.Group>

      <Form.Group className="formGroup">
        <Form.Label>Kuvaus</Form.Label>
        <Form.Control
          className="contentInput"
          size="sm"
          type="text"
          value = {content}
          onChange = {(event) => setContent(event.target.value)}
        />
      </Form.Group>
      <Button variant="light" type="submit">
        Lisää
      </Button>
    </Form>
  )
}

export default CalendarForm