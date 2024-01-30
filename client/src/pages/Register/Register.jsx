import React from 'react'
import { Navbar } from '../../components'
import { RegisterForm } from '../../elements'
import MenuItem from '../../components/MenuItem/MenuItem'

const Register = () => {

  return (
    <>
      <Navbar>
        <MenuItem
          content="Anmelden"
          path="/login"
        />
      </Navbar>
      <div className='full-height-with-navbar'> 
        <RegisterForm />
      </div>
    </>
  )
}

export default Register
