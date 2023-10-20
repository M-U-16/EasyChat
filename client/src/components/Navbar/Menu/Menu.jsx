import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import "./Menu.css"
import { 
  MenuButton,
  HomeButton
} from "../../../elements"
import { icons } from '../../../constants'

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
      <HomeButton />
      <div className="app__menu-wrapper">
        <MenuButton activeMenu={activeMenu} setActiveMenu={setActiveMenu}/>
        <div className={`app__menu-container${activeClass}`}>
          <Link className='link' to={"/chat"}>
            Chat <img className='chatbox' src={icons.chatboxIcon}/>
          </Link>
          <Link className='link' to={"/profil"}>
            Profil <img src={icons.blueProfileIcon}/>
          </Link>
          <Link className='link' to={"/abmelden"}>
            Abmelden <img src={icons.logout}/>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Menu
