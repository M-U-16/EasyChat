import React from 'react'
import { Navbar } from '../../components'
import { BackButton } from '../../elements'
import { Link } from 'react-router-dom'

const Register = () => {
  return (
    <>
        <Navbar showLogin={false}/>
        <div className='app__login-wrapper flex_center-full_height'>
            <form className='app__login-form'>
                <h1>Registrieren</h1>
                <input required type="email" placeholder='Email'/>
                <input required type="password" placeholder='Passwort'/>
                <input required type="password" placeholder='Passwort Bestätigen'/>
                
                <button type='submit'>Bestätigen</button>
            </form>
        </div>
        <BackButton />
    </>
  )
}

export default Register
