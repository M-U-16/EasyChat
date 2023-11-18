import React from 'react'
import "./Header.css"
import { motion } from "framer-motion"
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
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          ... ermöglicht es dir
          mit Freunden und Familie zu Chatten und in Kontakt zu bleiben.
        </motion.p>
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
