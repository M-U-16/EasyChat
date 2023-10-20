import React from 'react'
import "./Menu.css"
import { 
  LoginButton,
  MenuButton,
  BackButton,
  HomeButton
} from "../../../elements"
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

const Menu = (props) => {
  const showLogin = props.showLogin
  const [activeMenu, setActiveMenu] = useState(false)
  let activeClass = activeMenu ? " active-app-menu" : ""

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setActiveMenu(false)
    })
    return () => {
      window.removeEventListener("scroll", () => {
        setActiveMenu(false)
      })
    }
  }, [])

  return (
    <div className="app__menu">
      <div className="app__menu-wrapper">
        <MenuButton activeMenu={activeMenu} setActiveMenu={setActiveMenu}/>
        <div className={`app__menu-container${activeClass}`}>
          <Link className='link' to={"/chat"}>Chat</Link>
          <Link className='link' to={"/profil"}>Profil</Link>
          <Link className='link' to={"/abmelden"}>Abmelden</Link>

          <HomeButton />
        </div>
      </div>
    </div>
  )
}

export default Menu
