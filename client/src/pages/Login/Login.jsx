import React from 'react'
import "../css/form.css"
import "./Login.css"
import { Navbar } from '../../components'
import { BackButton, SubmitButton } from '../../elements'
import { Link, Navigate } from 'react-router-dom'
import { useState } from 'react'
import { backendConfig } from '../../constants'

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
    console.log(res)
    setIsLoading(false)
    if (!res.error) setLoginSuccess(true)
    if (res.error) {
      console.log(isLoading)
      if (res.message === "EMAIL_DOES_NOT_EXISTS") setEmailError(true)
      if (res.message === "PASSWORD_IS_INCORECT") setPasswordError(true)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const url = `http://${backendConfig.user.login.url}`
    const headers = {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "mode": "cors"
    }
    if (!isLoading) {
      resetErrors()
      try {
        setIsLoading(true)

        const res = await fetch(url, {
          method: backendConfig.user.login.method,
          headers: headers,
          credentials: "include",
          body: JSON.stringify(formData)
        })
        const resJson = await res.json()
        handleResponse(resJson)
        
      } catch (err) { console.log({err})}
    }
  }

  return (
    <>
      <Navbar showLogin={false}/>
      <div className='app__login-wrapper flex_center-full_height'>
        <form onSubmit={handleSubmit} className='app__login-form app__form'>
          <h1>Anmelden</h1>
          <div className="app__email-wrapper">
            {emailError && <p>Email existiert nicht!</p>}
            <input 
              required type="email" placeholder='Email' name='email'
              onChange={handleInput}
            />
          </div>
          <div className='app__password-wrapper'>
            {passwordError && <p>Passwort ist nicht richtig!</p>}
            <input
              required type="password" placeholder='Passwort'
              onChange={handleInput} name='password'
            />
          </div>
          
          <SubmitButton isLoading={isLoading} />
          <div className="app__login-register">
            <p>Haben Sie noch keinen Account?</p>
            <Link to={`/registrieren`} className='link__to-register'>Registrieren</Link>
          </div>
        </form>
      </div>

      {loginSuccess && <Navigate to={"/chat"} />}
    </>
  )
}

export default Login
