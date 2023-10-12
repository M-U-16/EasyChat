import React from 'react'
import "./Header.css"
import { images } from '../../constants'

const Header = () => {
  return (
    <header className='app__homepage-header'>
        <div className='app__landing-section'>
          <div className="app__landing-headings">
            <h1>Easy</h1>
            <h2>Chat</h2>
          </div>
          <p>
            EasyChat ermöglicht es dir schnell, sicher und einfach
            mit Freunden und Familie zu Chatten und in Kontakt zu bleiben.
          </p>
          <button className="app__landing-button">
            <span>Jetzt Chatten</span>
            <img src={images.sendIcon}/>
          </button>
        </div>
    </header>
  )
}

export default Header
