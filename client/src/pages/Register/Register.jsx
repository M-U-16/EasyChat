import React from 'react'
import { Navbar } from '../../components'
import {
  BackButton,
  RegisterForm,
  RegisterSuccess
} from '../../elements'
import MenuItem from '../../components/MenuItem/MenuItem'

import { useState } from 'react'

const Register = () => {
  const [showRegister, setShowRegister] = useState(true)

  return (
    <>
      <Navbar>
        <MenuItem content="Startseite" path="/" />
        <MenuItem content="Anmelden" path="/login" />
      </Navbar>
      <div className='app__register-wrapper flex_center-full_height'>
        { showRegister && <RegisterForm setShowRegister={setShowRegister}/> }
        { !showRegister && <RegisterSuccess />}
      </div>
    </>
  )
}

export default Register
