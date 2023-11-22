import React from 'react'
import "./Header.css"
import { motion, useMotionValue, useTransform } from "framer-motion"
import { images, icons } from '../../constants'
import { LoginButton, ActionButton } from '../../elements'



const Header = () => {
  
  const x = useMotionValue(0)
  const input = [-200, 0, 200]
  const output = [0, 1, 0]
  const opacity = useTransform(x, input, output)

  
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
          drag="x"
          style={{x, opacity}}
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
      </div>
    </header>
  )
}

export default Header
