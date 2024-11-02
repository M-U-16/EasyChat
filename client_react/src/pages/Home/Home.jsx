import React from 'react'
import "./Home.css"
import Homepage from '../Homepage/Homepage'
import { Navbar, Footer } from '../../components'
import MenuItem from '../../components/MenuItem/MenuItem'

{
  /* <Link className='link' to={"/chat"}>
    Chat <img className='chatbox' src={icons.chatboxIcon}/>
  </Link>
  <Link className='link' to={"/profil"}>
    Profil <img src={icons.blueProfileIcon}/>
  </Link>
  <Link className='link' to={"/"} onClick={logoutUser}>
    Abmelden <img src={icons.logout}/>
  </Link> */
}

const Home = () => {
  return (
    <>
      <Navbar showLogin={true}>
        <MenuItem
          currentPage={false}
          content="Anmelden"
          path="/login" 
        />
        <MenuItem
          currentPage={true}
          content="Registrieren"
          path="/registrieren" 
        />
      </Navbar>
      <Homepage />
      <Footer />
    </>
  )
}

export default Home
