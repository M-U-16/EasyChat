import React from 'react'
import { useState, useEffect } from 'react'

import "./SidePanel.css"
import { icons } from '../../constants'
import { backendConfig } from '../../constants'
import ContactPanel from '../../containers/ContactPanel/ContactPanel'
import ControlPanel from '../../containers/ControlPanel/ControlPanel'

const SidePanel = () => {
  
  const url = `http://${backendConfig.user.contacts.url}`
  const [contacts, setContacts] = useState([])
  const [loadContacts, setLoadContacts] = useState(false)

  const [isLoading, setIsLoading] = useState(false)
  const [loadError, setLoadError] = useState(false)

  const getUserContacts = async() => {
    try {
      setLoadError(false)
      setIsLoading(true)
      const res = await fetch(url,
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
        if (arr.length < 1) setLoadError(true)
        setContacts(arr)
      } else {
        console.log(jsonRes.message)
        setLoadError(true)
        setIsLoading(false)
      }

    } catch(err) { 
      console.log({err: err})
      setIsLoading(false)
      setLoadError(true)
    }
  }

  const refreshChat = () => {
    setTimeout(() => {
      getUserContacts()
    }, 1000);
  }

  const testCreate = async() => {
    const test = await fetch("http://localhost:3000/user/chats/new-chat",
    { 
      method: "post",
      body: JSON.stringify({
        "contactName": "b",
      })
    })
    console.log(test)
  }

  useEffect(() => {
    getUserContacts()
  },[])

  return (
    <nav className='app__chat-sidepanel loading'>
      <ControlPanel />
      { 
        contacts &&
        contacts.map((contact, index) => 
          <ContactPanel contact={contact} key={index} />
        )
      }
      {
        loadError &&
        <button className='app__chat-refresh-btn' onClick={getUserContacts}>
          <img src={icons.refreshIcon} />
        </button>
      }

      { isLoading && <div className='loading-spinner'></div>}
    </nav>
  )
}
export default SidePanel