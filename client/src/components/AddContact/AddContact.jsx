import React, { useState, useContext } from 'react'
import "./AddContact.css"
import { backendConfig, icons } from "../../constants"
import {contactsContext} from "../SidePanel/SidePanel"

const AddContact = ({ setDisplayContact }) => {
  const handleDisplay = () => setDisplayContact(false)
  const [contactName, setContactName] = useState(null)
  const refreshChat = useContext(contactsContext)

  const handleFormSubmit = (e) => {
    e.preventDefault()
    const xhttp = new XMLHttpRequest()

    try {
      const data = { contactName: contactName }

      xhttp.withCredentials = true
      xhttp.onreadystatechange = () => {
        if (xhttp.readyState === 4 && xhttp.status === 200) {
          //console.log(JSON.parse(xhttp.responseText))
          const res = JSON.parse(xhttp.responseText)
          console.log(res)
          if (!res.error) {
            handleDisplay()
            refreshChat()
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
  const handleContact = (e) => {
    setContactName(e.target.value)
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
          onClick={handleDisplay}
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
