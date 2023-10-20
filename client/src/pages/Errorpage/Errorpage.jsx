import React from 'react'
import { Navbar } from '../../components'
import "./Errorpage.css"
import { BackButton } from '../../elements'

const Errorpage = () => {
  return (
    <>
        <Navbar />
        <section className='app__error-section flex_center-full_height'>
            <h1 className='app__error-code'>404</h1>
            <p>Seite konnte nicht gefunden werden.</p>
        </section>
        <BackButton />
    </>
  )
}

export default Errorpage
