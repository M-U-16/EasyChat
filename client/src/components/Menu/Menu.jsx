import React,
{ useState,
  useEffect 
} from 'react'
import {
  MenuButton,
  HomeButton
} from '../../elements'
import "./Menu.css"

const Menu = (props) => {
  const [activeMenu, setActiveMenu] = useState(false)
  let activeClass = activeMenu ? " active-app-menu" : ""

  const removeOnClick = (e) => {
    const firstClass = e.target.classList[0]
    setActiveMenu(state => {
      if (
        state &&
        firstClass !== "app__menu-container" &&
        firstClass !== "app__menu-button" &&
        firstClass !== "menu__hamburger-layer"
      ) {
        return !state
      }
      return state
    })
  }

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setActiveMenu(false)
    })
    window.addEventListener("click", (e) => { removeOnClick(e) })
    return () => {
      window.removeEventListener("click", (e) => { removeOnClick(e) })
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
          {props.links}
        </div>
      </div>
    </div>
  )
}

export default Menu
