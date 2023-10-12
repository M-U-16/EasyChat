import { useState } from 'react'
import { Navbar, Footer } from './components'
import './App.css'
import Homepage from './pages/Homepage/Homepage'

function App() {

  return (
    <>
      <Navbar showLogin={true}/>
      <Homepage />
      <Footer />
    </>
  )
}

export default App
