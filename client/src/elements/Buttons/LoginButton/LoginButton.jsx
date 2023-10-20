import React from 'react'
import {Link} from "react-router-dom"
import { images } from '../../../constants'
import "./LoginButton.css"

const LoginButton = () => {
  return (
    <Link to={`/login`} className="app__menu-login-button">
        <span>Anmelden</span>
        <img src={images.loginIcon} />
    </Link>
  )
}

export default LoginButton
