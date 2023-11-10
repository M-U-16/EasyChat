import React, { useState, useContext } from 'react'
import "./AddContact.css"
import { backendConfig, icons } from "../../constants"
import {contactsContext} from "../SidePanel/SidePanel"

const AddContact = ({ setDisplayContact }) => {
  const [contactName, setContactName] = useState(null)
  const refreshChat = useContext(contactsContext)

  const handleContact = (e) => setContactName(e.target.value)
  const removeDisplay = () => setDisplayContact(false)
  
  const handleFormSubmit = (e) => {
    e.preventDefault()
    const xhttp = new XMLHttpRequest()

    try {

      xhttp.withCredentials = true
      xhttp.onreadystatechange = () => {
        if (xhttp.readyState === 4 && xhttp.status === 200) {
          const res = JSON.parse(xhttp.responseText)
          if (!res.error) {
            refreshChat()
            removeDisplay()
          }
        }
      }
      xhttp.open(
        backendConfig.user.newChat.method, //method
        `http://${backendConfig.user.newChat.url}`, //url
        true //async = true
      )
      xhttp.setRequestHeader("Content-type", "application/json")
      const body = JSON.stringify({ contactName: contactName })
      xhttp.send(body)
    } catch(err) {
      console.log(err)
    }
    
  }

  return (
    <div className='chat__addContact-overlay'>
      <form
        className='chat__addContact-form'
        onSubmit={handleFormSubmit}
      >
        <button
          className='chat__addContact-close-bnt'
          type='button'
          onClick={removeDisplay}
        >
          <img src={icons.close} alt="" />
        </button>

        <div className='chat__addContact-head'>
          <h2>Kontakt hinzufügen</h2>
        </div>
        <label htmlFor="contact-name-input">
          Benutzername
        </label>
        <input 
          id='contact-name-input'
          name="username"
          type="text"
          onChange={handleContact}
        />
        <button className='chat__addContact-submit' type='submit'>Hinzufügen</button>
      </form>
    </div>
  )
}

export default AddContact
