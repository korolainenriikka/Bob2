import React, { useState } from 'react'
import { Form , Button } from 'react-bootstrap'

const CalendarForm = ({ login }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const submit = (event) => {
    event.preventDefault()

    setUsername('')
    setPassword('')
    login(username, password)
  }

  return (
    <Form onSubmit={submit} >
      <Form.Group className="formGroup">
        <Form.Control
          className="usernameInput"
          size="sm"
          type="text"
          placeholder="käyttäjätunnus"
          value = {username}
          onChange = {(event) => setUsername(event.target.value)}
        />
      </Form.Group>

      <Form.Group className="formGroup">
        <Form.Control
          className="passwordInput"
          size="sm"
          type="password"
          placeholder="salasana"
          value = {password}
          onChange = {(event) => setPassword(event.target.value)}
        />
      </Form.Group>
      <Button variant="light" type="submit">
        kirjaudu
      </Button>
    </Form>
  )
}

export default CalendarForm