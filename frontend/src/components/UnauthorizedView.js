import React from 'react'
import LoginForm from './LoginForm'

const UnauthorizedView = () => {

  const login = () => {
    console.log('logging in....')
  }

  return (
    <div id='unauthDiv'>
      <p id='unauthText'>Sorry, unauthorized</p><br/>
      <LoginForm login={login}/>
      <img alt="logo" id="unauthLogo" src={require('../images/theworldwidebob.jpg')} />
    </div>
  )
}

export default UnauthorizedView