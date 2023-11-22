import React from 'react'
import { Link } from 'react-router-dom'
import { images } from '../../../constants'
import "./HomeButton.css"
import { motion } from 'framer-motion'

const HomeButton = () => {
  return (
    <motion.button
      className='app__home-button-wrapper'
      whileHover={{
        scale: 1.1
      }}
      
      transition={{ duration: 0.2 }}
    >
      <Link to={`/`} className='app__home-button'>
        <img src={images.home} />
      </Link>
    </motion.button>
  )
}

export default HomeButton
