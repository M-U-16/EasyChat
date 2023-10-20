import React from 'react'
import { Navbar } from '../../components'
import {
  BackButton,
  RegisterForm,
  RegisterSuccess
} from '../../elements'

import { useState } from 'react'

const Register = () => {
  const [showRegister, setShowRegister] = useState(true)

  return (
    <>
      <Navbar showLogin={true}/>
      <div className='app__register-wrapper flex_center-full_height'>
        { showRegister && <RegisterForm setShowRegister={setShowRegister}/> }
        { !showRegister && <RegisterSuccess />}
      </div>
      {/* <BackButton /> */}
    </>
  )
}

export default Register
