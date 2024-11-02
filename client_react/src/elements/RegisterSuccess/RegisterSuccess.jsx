import React from 'react'
import "./RegisterSuccess.css"

import { images } from "../../constants"
import { Link } from 'react-router-dom'

const RegisterSuccess = () => {
  return (
    <div className='register__success-wrapper'>
      <div className="register__success-img-container">
        <img src={images.checkMark} alt="Erfolg" />
      </div>
      <p>Dein Account wurde erfolgreich erstellt!</p>
      <Link className='login__link' to={"/login"}>Jetzt Anmelden</Link>
    </div>
  )
}

export default RegisterSuccess
