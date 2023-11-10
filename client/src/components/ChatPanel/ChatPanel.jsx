import React from 'react'
import "./ChatPanel.css"
import ChatInputContainer from '../ChatInputContainer/ChatInputContainer'
import MessagesContainer from '../MessagesContainer/MessagesContainer'

const ChatPanel = () => {
  return (
    <div className='chat__panel-conatainer' id='chat-container'>
      <MessagesContainer />
      <ChatInputContainer />
    </div>
  )
}

export default ChatPanel
