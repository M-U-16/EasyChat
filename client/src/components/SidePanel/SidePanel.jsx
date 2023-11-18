import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef
} from 'react'

import "./SidePanel.css"
import { icons } from '../../constants'
import { backendConfig } from '../../constants'
import ContactPanel from '../ContactPanel/ContactPanel'
import ControlPanel from '../ControlPanel/ControlPanel'
import { chatContext } from '../../pages/Chat/Chat'

export const contactsContext = createContext()

const SidePanel = () => {
  
  const chat = useContext(chatContext)
  const [contacts, setContacts] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [loadError, setLoadError] = useState(false)
  const contactsContainer = useRef()
  
  const getUserContacts = async() => {
    try {
      setLoadError(false)
      setIsLoading(true)
      const res = await fetch(backendConfig.user.contacts.url,
        {
          method: backendConfig.user.contacts.method,
          mode: "cors",
          credentials: "include",
          sameSite: "none",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        }
      )
      const jsonRes = await res.json()
      if (!jsonRes.error) {
        const arr = await jsonRes.contacts.map(contact => contact)
        if (arr) setIsLoading(false)
        setContacts(arr)
        chat.setCurrentChat(arr[0].room_id)
      } else {
        setLoadError(true)
        setIsLoading(false)
      }
      
    } catch(err) { 
      console.log({err: err})
      setIsLoading(false)
      setLoadError(true)
    }
  }

  useEffect(() => {
    getUserContacts()
  },[])

  return (
    <nav className='app__chat-sidepanel'>
      <contactsContext.Provider value={getUserContacts}>
        <ControlPanel />
      </contactsContext.Provider>
      <div
        className='chat__contacts-container no-scroll'
        id='chat-contacts-container'
        ref={contactsContainer}
      >
        { 
          contacts &&
          contacts.map((contact, index) =>
            <ContactPanel
              contact={contact}
              key={index}
            />
          )
        }
      </div>
      {/* {
        loadError &&
        <button
          className='app__chat-refresh-btn'
          onClick={getUserContacts}
        >
          <img src={icons.refreshIcon} />
        </button>
      } */}

      { isLoading && <div className='loading-spinner'></div>}
    </nav>
  )
}
export default SidePanel