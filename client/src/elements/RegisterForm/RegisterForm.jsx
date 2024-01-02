import React, { useState } from 'react'
import "./RegisterForm.css"
import SubmitButton from '../Buttons/SubmitButton/SubmitButton'

const RegisterForm = (props) => {
  const [formData, setFormData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [emailError, setEmailError] = useState("")
  const [usernameError, setUsernameError] = useState("")

  const hadleFormData = (prev, event) => {

    if (event.target.value == null) value = ""
    return {
      ...prev,
      ...{[event.target.name]: event.target.value}
    }

  }

  const handleInput = (event) => setFormData(prev => hadleFormData(prev, event))

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsLoading(true)
    const headers = {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "mode": "cors"
    }
    if (!isLoading) {
      try {
        const res = await fetch(
          "/api/user/register",
          {
            method: "POST",
            headers: headers,
            body: JSON.stringify(formData)
          }
        )
        const resJson = await res.json()
        
        //shows result of registration
        if (resJson) {
          setIsLoading(false)
          if (!resJson.error) props.setShowRegister(false)
          if (resJson.message == "USER_ALREADY_EXISTS") {}
          if (resJson.message == "COULD_NOT_ADD_USER") {}
        }
      } catch (err) {}
    }
  }

  return (
    <form className='app__register-form app__form'  onSubmit={handleSubmit}>
      <h1>Registrieren</h1>
      <div className='app__input-wrapper'>
        {/* <label htmlFor="register-username-input">
          Email
        </label> */}
        <input
          placeholder='Email'
          required
          name="email"
          type="email"
          onChange={handleInput}
        />
      </div>
      <div className='app__input-wrapper'>
        {/* <label htmlFor="register-username-input">
          Benutzername
        </label> */}
        <input
          placeholder='Benutzername'
          id='register-username-input'
          required
          name="username"
          type="text"
          onChange={handleInput}
        />
      </div>
      <div className='app__input-wrapper'>
        {/* <label htmlFor="register-username-input">
          Passwort
        </label> */}
        <input
          placeholder='Passwort'
          id='register-password-input'
          required
          name="password"
          type="password"
          onChange={handleInput}
        />
      </div>
      <SubmitButton isLoading={isLoading}/>
    </form>
  )
}
export default RegisterForm