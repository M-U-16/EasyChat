import React, {
  useState,
  useEffect,
  useContext,
  useRef
} from 'react'
import "./AddContact.css"
import { backendConfig, icons } from "../../constants"
import {contactsContext} from "../SidePanel/SidePanel"

const AddContact = ({displayContact, setDisplayContact }) => {
  const [contactName, setContactName] = useState(null)
  const refreshChat = useContext(contactsContext)
  const timeoutRef = useRef(null)
  const form = useRef(null)
  const overlay = useRef(null)

  useEffect(() => {
    //clears timeout on unmount
    return () => clearTimeout(timeoutRef.current)
  }, []);
  //animates out the overlay and form
  const animateOut = () => {
    form.current.classList.add("slide-out")
    overlay.current.classList.add("fade-out")
  }
  //handles the contact input on the form
  const handleContact = (e) => setContactName(e.target.value)
  const removeDisplay = () => {
    animateOut()

    timeoutRef.current = setTimeout(
      () =>  {
        setDisplayContact(false)
      }, 200
    )
  
  }
  
  const handleFormSubmit = (e) => {
    e.preventDefault()
    const xhttp = new XMLHttpRequest()
    try {
      xhttp.withCredentials = true
      xhttp.onreadystatechange = () => {
        if (xhttp.readyState === 4 && xhttp.status === 200) {
          const res = JSON.parse(xhttp.responseText)
          console.log(res)
          if (!res.error) {
            refreshChat()
            removeDisplay()
          }
        }
      }
      xhttp.open(
        backendConfig.user.newChat.method, //method
        `${backendConfig.user.newChat.url}`, //url
        true //async = true
      )
      xhttp.setRequestHeader("Content-type", "application/json")
      const body = JSON.stringify({ contactName: contactName })
      xhttp.send(body)
    } catch(err) { console.log(err) }
  }

  return (
    <div
      className='chat__addContact-overlay'
      ref={overlay}
    >
      <form
        className='chat__addContact-form'
        onSubmit={handleFormSubmit}
        ref={form}
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
        <div className="addContact__input-container">
          <label className="username__input-label no-select" htmlFor="contact-name-input">
            Benutzername
          </label>
          <input 
            id='contact-name-input'
            name="username"
            type="text"
            onChange={handleContact}
          />
        </div>
        <button className='chat__addContact-submit' type='submit'>Hinzufügen</button>
      </form>
    </div>
  )
}

export default AddContact
