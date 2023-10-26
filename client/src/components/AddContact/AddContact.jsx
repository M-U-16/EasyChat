import React from 'react'
import "./AddContact.css"
import { icons } from "../../constants"

const AddContact = ({ setDisplayContact }) => {
  const handleDisplay = () => setDisplayContact(false)

  return (
    <div className='chat__addContact-overlay'>
      <form className='chat__addContact-form'>
        <button
          className='chat__addContact-close-bnt'
          type='button'
          onClick={handleDisplay}
        >
          <img src={icons.close} alt="" />
        </button>
        <h2>Kontakt hinzufügen</h2>
        <label htmlFor="contact-name-input">
          Benutzername des Kontakts:
        </label>
        <input id='contact-name-input' type="text"/>
        <button className='chat__addContact-submit' type='submit'>Hinzufügen</button>
      </form>
    </div>
  )
}

export default AddContact
