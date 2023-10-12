import React from 'react'
import "./Login.css"
import { Navbar } from '../../components'
import { BackButton } from '../../elements'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <>
      <Navbar showLogin={false}/>
      <div className='app__login-wrapper flex_center-full_height'>
        <form className='app__login-form'>
          <h1>Anmelden</h1>
          <input required type="email" placeholder='Email'/>
          <input required type="password" placeholder='Passwort'/>
          
          <button type='submit'>Bestätigen</button>
        </form>
        <div className="app__login-register">
          <p>Haben Sie noch keinen Account?</p>
          <Link to={`/registrieren`}>Registrieren</Link>
        </div>
      </div>
      <BackButton />
    </>
    
  )
}

export default Login
