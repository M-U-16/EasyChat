import React from 'react'
import "./RegisterForm.css"

import { useState } from 'react'
import { backendConfig } from '../../constants'

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
    const url = `http://${backendConfig.user.register.url}`
    const headers = {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "mode": "cors"
    }
    if (!isLoading) {
      try {
        const res = await fetch(url,{
          method: backendConfig.user.register.method,
          headers: headers,
          body: JSON.stringify(formData)
        })
        const resJson = await res.json()
        
        //shows result of registration
        console.log(resJson)
        if (resJson) {
          console.log(isLoading)
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
      <div className='app__register-input-wrapper'>
        <input 
          required name="email" type="email" placeholder='Email'
          onChange={handleInput}
        />
      </div>
      <div className='app__register-input-wrapper'>
        <input 
          required name="username" type="text"
          placeholder='Benutzername' onChange={handleInput}
        />
      </div>
      <div className='app__register-input-wrapper'>
        <input
          required name="password" type="password"
          placeholder='Passwort' onChange={handleInput}
        />
      </div>
      <SubmitButton isLoading={isLoading}/>
    </form>
  )
}

export default RegisterForm
