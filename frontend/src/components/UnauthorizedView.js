import React from 'react'
import LoginForm from './LoginForm'
import authService from '../services/authService'

const UnauthorizedView = ({ setAuthorized }) => {

  const handleLogin = (username, password) => {
    const credentials = {
      username: username,
      password: password
    }

    authService
      .login(credentials)
      .then(response => {
        console.log(response)
        setAuthorized(true)
      })
      .catch ((exception) => {
        console.log(exception)
      })
  }

  return (
    <div id='unauthDiv'>
      <p id='unauthText'>Sorry, unauthorized</p><br/>
      <LoginForm login={handleLogin}/>
      <img alt="logo" id="unauthLogo" src={require('../images/theworldwidebob.jpg')} />
    </div>
  )
}

export default UnauthorizedView