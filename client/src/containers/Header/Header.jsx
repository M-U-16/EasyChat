import React from 'react'
import "./Header.css"
import { images, icons } from '../../constants'
import { LoginButton, ActionButton } from '../../elements'

const Header = () => {
  return (
    <header className='app__homepage-header'>
      <div className='app__landing-section'>
        <div className="app__landing-headings">
          <h2>Easy</h2>
          <h1>
            <span>
              Chat
              <img className='app__chat-icon' src={icons.chatBoxEllipse} />
            </span>
          </h1>
        </div>
        <p>
          ... ermöglicht es dir
          mit Freunden und Familie zu Chatten und in Kontakt zu bleiben.
        </p>
        <div className="app__cta-container">
          <LoginButton className="app__landing-cta" />
          <ActionButton action={"/registrieren"} content={"Registrieren"} />
        </div>
      </div>
      <div>
        {/* <WorldSvg /> */}
      </div>
    </header>
  )
}

export default Header
