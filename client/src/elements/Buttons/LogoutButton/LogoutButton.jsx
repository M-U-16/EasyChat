import React from 'react'
import "./LogoutButton.css"
import { Link } from 'react-router-dom'
import { icons } from '../../../constants'

const LogoutButton = () => {
    const logoutUser = () => {
        fetch(
            "api/user/logout",
          { 
            method: "POST",
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
