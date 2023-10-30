import React, { useState, useEffect } from 'react'
import "./ControlPanel.css"
import { icons } from '../../constants'
import { createPortal } from 'react-dom'
import AddContact from '../AddContact/AddContact'

const ControlPanel = () => {
  const [displayContact, setDisplayContact] = useState(false)
  const [domIsReady, setDomIsReady] = useState(false)
  const handleContactDisplay = () => setDisplayContact(true)

  useEffect(() => {
    setDomIsReady(true)
  }, [])

  return (
    <div className='chat__side-control-container'>
      <button
        className='chat__new-chat-btn'
        title='Kontak hinzufügen'
        onClick={handleContactDisplay}
      >+</button>
      <div className="search-container">
        {/* <input type="text" /> */}
        <button title='Nach Kontakt Suchen' className='chat__search-btn'>
          <img src={icons.searchIcon} />
        </button>
      </div>

      {
        displayContact &&
        domIsReady &&
        createPortal(
          <AddContact setDisplayContact={setDisplayContact}/>,
          document.getElementById("chat-container")
        )
      }
    </div>
  )
}

export default ControlPanel
