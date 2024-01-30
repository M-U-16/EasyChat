import React, { useState } from 'react'
import "./RegisterForm.css"
import SubmitButton from '../Buttons/SubmitButton/SubmitButton'
import RegisterSuccess from '../RegisterSuccess/RegisterSuccess'
import Form from '../../components/Form/Form'

const RegisterForm = (props) => {
  const [showRegister, setShowRegister] = useState(true)
  const [formData, setFormData] = useState(null)

  const [isLoading, setIsLoading] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [usernameError, setUsernameError] = useState(false)

  const hadleFormData = (prev, event) => {
    let value = event.target.value
    if (value == null) value = ""
    return { ...prev, ...{[event.target.name]: value}}
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
          if (!resJson.error) setShowRegister(false)
          if (resJson.message == "USER_ALREADY_EXISTS") {}
          if (resJson.message == "COULD_NOT_ADD_USER") {}
        }
      } catch (err) {}
    }
  }

  if (showRegister) {
    return (
      <Form handleSubmit={handleSubmit}>
        <h1>Registrieren</h1>
        <div className='app__input-wrapper'>
          <input
            placeholder='Email'
            required
            name="email"
            type="email"
            onChange={handleInput}
          />
        </div>
        <div className='app__input-wrapper'>
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
          <input
            placeholder='Passwort'
            id='register-password-input'
            required
            name="password"
            type="password"
            onChange={handleInput}
          />
        </div>
      </Form>
    )
  } else {
    return <RegisterSuccess />
  }
}
export default RegisterForm