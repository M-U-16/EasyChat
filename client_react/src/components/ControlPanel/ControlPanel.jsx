import React, { useState, useEffect } from 'react'
import "./ControlPanel.css"
import { icons } from '../../constants'
import { createPortal } from 'react-dom'
import AddContact from '../AddContact/AddContact'

const ControlPanel = () => {
  const [displayContact, setDisplayContact] = useState(false)
  const handleContactDisplay = () => setDisplayContact(true)

  return (
    <div className='chat__side-control-container'>
      <button
        className='chat__new-chat-btn'
        title='Kontak hinzufügen'
        onClick={handleContactDisplay}
      >
        <img src={icons.plus} alt="" />
      </button>
      <div className="search-container">
        <button title='Nach Kontakt Suchen' className='chat__search-btn'>
          <img src={icons.searchIcon} />
        </button>
      </div>

      {
        displayContact &&
        createPortal(
          <AddContact
            setDisplayContact={setDisplayContact}
            displayContact={displayContact}
          />,
          document.getElementById("chat-container")
        )
      }
    </div>
  )
}

export default ControlPanel
