import React from 'react'
import "../css/form.css"
import "./Login.css"
import { Navbar } from '../../components'
import { SubmitButton } from '../../elements'
import { Link, Navigate } from 'react-router-dom'
import { useState } from 'react'
import MenuItem from "../../components/MenuItem/MenuItem"

const Login = () => {

  const [formData, setFormData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [loginSuccess, setLoginSuccess] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)

  const hadleFormData = (prev, event) => {

    let value = event.target.value
    if (value == null) value = ""
    return {
      ...prev,
      ...{[event.target.name]: value}
    }
  }

  const handleInput = (event) => {
    setFormData(prev => hadleFormData(prev, event))
  }

  const resetErrors = () => {
    setEmailError(false)
    setPasswordError(false)
  }

  const handleResponse = (res) => {
    setIsLoading(false)
    if (!res.error) setLoginSuccess(true)
    if (res.error) {
      if (res.message === "EMAIL_DOES_NOT_EXISTS") setEmailError(true)
      if (res.message === "PASSWORD_IS_INCORECT") setPasswordError(true)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const headers = {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "mode": "cors"
    }
    if (!isLoading) {
      resetErrors()
      try {
        setIsLoading(true)
        const res = await fetch(
          "/api/user/login",
          {
            method: "POST",
            headers: headers,
            credentials: "include",
            body: JSON.stringify(formData)
          }
        )
        const resJson = await res.json()
        handleResponse(resJson)
        
      } catch (err) { console.log({err})}
    }
  }

  return (
    <>
      <Navbar>
        <MenuItem content="Startseite" path="/" />
        <MenuItem content="Registrieren" path="/registrieren" />
      </Navbar>
      <div className='app__login-wrapper flex_center-full_height'>
        <form onSubmit={handleSubmit} className='app__login-form app__form'>
          <h1>Anmelden</h1>
          <div className="app__input-wrapper">
            {emailError && <p>Email existiert nicht!</p>}
            {/* <label id='form-label' htmlFor="login-email-input">Email</label> */}
            <input
              placeholder='Email'
              required type="email" name='email'
              onChange={handleInput} id="login-email-input"
            />
          </div>
          <div className='app__input-wrapper'>
            {/* <label id='form-label' htmlFor="login-email-input">Passwort</label> */}
            {passwordError && <p>Passwort ist nicht richtig!</p>}
            <input
              required type="password"
              placeholder='Passwort'
              onChange={handleInput} name='password'
            />
          </div>
          
          <SubmitButton isLoading={isLoading} />
          <div className="app__login-register">
            <p>Haben Sie noch keinen Account? |</p>
            <Link to={`/registrieren`} className='link__to-register'>Registrieren</Link>
          </div>
        </form>
      </div>

      {loginSuccess && <Navigate to={"/chat"} />}
    </>
  )
}

export default Login
