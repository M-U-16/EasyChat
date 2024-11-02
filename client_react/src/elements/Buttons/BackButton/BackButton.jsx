import React from 'react'
import { Link } from 'react-router-dom'
import { images } from '../../../constants'
import "./BackButton.css"

const BackButton = () => {
  return (
    <Link to={`/`} className='app__back-button'>
        <img src={images.home} />
    </Link>
  )
}

export default BackButton
