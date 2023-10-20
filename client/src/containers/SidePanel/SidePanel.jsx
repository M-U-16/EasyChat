import React from 'react'
import "./SidePanel.css"

import { useState, useEffect } from 'react'
import { backendConfig } from '../../constants'
import ContactPanel from '../ContactPanel/ContactPanel'

const SidePanel = () => {
  
  const url = `http://${backendConfig.user.contacts.url}`
  const [contacts, setContacts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const getUserContacts = async() => {
    try {
        const res = await fetch(url,
            {
              method: backendConfig.user.contacts.method,
              headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "mode": "cors"
              }
            }
        )
        const jsonRes = await res.json()
        const arr = await jsonRes.contacts.map(contact => contact)
        setContacts(arr)
        setIsLoading(false)

    } catch(err) { console.log(err) }
  }

  useEffect(() => {
    getUserContacts()
  },[])

  return (
    <nav className='app__chat-sidepanel loading'>

      { contacts &&
        contacts.map((contact, index) => 
          <ContactPanel contact={contact} key={index} />
        )
      }

      {isLoading && <div className='loading-spinner'></div>}
    </nav>
  )
}

export default SidePanel
