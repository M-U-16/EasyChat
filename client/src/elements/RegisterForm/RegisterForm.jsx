import React from 'react'
import "./RegisterForm.css"

import { useState } from 'react'
import { backendConfig } from '../../constants'

import SubmitButton from '../SubmitButton/SubmitButton'

const RegisterForm = (props) => {
  const [formData, setFormData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const hadleFormData = (prev, event) => {

    let value = event.target.value
    if (event.target.value == null) value = ""
    return {
      ...prev,
      ...{[event.target.name]: value}
    }
  }

  const handleInput = (event) => {
    setFormData(prev => hadleFormData(prev, event))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
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
        
        //shows success page
        console.log(resJson)
        if (!resJson.error) props.setShowRegister(false)
        if (resJson.error && resJson.message == "USER_ALREADY_EXISTS") {}
        if (resJson.error && resJson.message == "COULD_NOT_ADD_USER") {}
      } catch (err) { console.log({err})}
    }
    setIsLoading(true)
  }

  return (
    <form className='app__register-form app__form'  onSubmit={handleSubmit}>
      <h1>Registrieren</h1>
      <input 
        required name="email" type="email" placeholder='Email'
        onChange={handleInput}
      />
      <input 
        required name="username" type="text"
        placeholder='Benutzername' onChange={handleInput}
      />
      <input
        required name="password" type="password"
        placeholder='Passwort' onChange={handleInput}
      />
      <SubmitButton isLoading={isLoading}/>
    </form>
  )
}

export default RegisterForm
