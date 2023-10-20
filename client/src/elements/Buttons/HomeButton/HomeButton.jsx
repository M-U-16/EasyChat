import React from 'react'
import { Link } from 'react-router-dom'
import { images } from '../../../constants'
import "./HomeButton.css"

const HomeButton = () => {
  return (
    <Link to={`/`} className='app__home-button'>
        <img src={images.home} />
    </Link>
  )
}

export default HomeButton
