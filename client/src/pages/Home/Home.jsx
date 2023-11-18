import React from 'react'
import "./Home.css"
import Homepage from '../Homepage/Homepage'
import { Navbar, Footer } from '../../components'

const Home = () => {
  return (
    <>
        <Navbar showLogin={true} />
        <Homepage />
        <Footer />
    </>
  )
}

export default Home
