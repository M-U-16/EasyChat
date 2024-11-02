import React from 'react'
import "./Login.css"

import { Navbar } from '../../components'
import { SubmitButton } from '../../elements'
import { Link, Navigate } from 'react-router-dom'
import { useState } from 'react'
import MenuItem from "../../components/MenuItem/MenuItem"

import LoginForm from '../../elements/LoginForm/LoginForm'

const Login = () => {

  const [formData, setFormData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [loginSuccess, setLoginSuccess] = useState(false)
  
  return (
    <>
      <Navbar>
        <MenuItem
          content="Registrieren"
          path="/registrieren"
        />
      </Navbar>
      <div className='flex_center-full_height'>
        <LoginForm />
      </div>
      {loginSuccess && <Navigate to={"/chat"} />}
    </>
  )
}
export default Login