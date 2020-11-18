import React from 'react'
import LoginForm from './LoginForm'
import authService from '../services/authService'

const UnauthorizedView = ({ setAuthorized }) => {
  console.log(process.env.REACT_APP_TOKEN)
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
        localStorage.setItem('bob2Auth', process.env.REACT_APP_TOKEN)
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