import React from 'react'
import "./LogoutButton.css"
import { Link } from 'react-router-dom'
import { icons } from '../../../constants'
import { backendConfig } from '../../../constants'

const LogoutButton = () => {
    const logoutUser = () => {
        fetch(
          backendConfig.user.logout.url,
          { 
            method: backendConfig.user.logout.method,
            credentials: "include",
            mode: "no-cors"
          }
        )
    }
    return (
        <Link
            to={"/"}
            onClick={logoutUser}
            className='app__menu-link'
        >
            Abmelden <img src={icons.logout} />
        </Link>
    )
}

export default LogoutButton
