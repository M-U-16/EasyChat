import React from 'react'
import "./Chat.css"
import { Navbar } from '../../components'

import { SidePanel } from '../../containers'

const Chat = () => {

  return (
    <>
        <Navbar />
        <div className='app__chat-container'>
          <SidePanel />
        </div>
    </>
  )
}

export default Chat
