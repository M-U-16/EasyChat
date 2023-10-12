import "./Menu.css"
import React from 'react'
import { LoginButton } from "../../../elements"

const Menu = (props) => {
  const showLogin = props.showLogin

  return (
    <div className="app__menu">
        {showLogin && <LoginButton />}
    </div>
  )
}

export default Menu
