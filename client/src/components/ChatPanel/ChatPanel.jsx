import React from 'react'
import "./ChatPanel.css"
import ChatInputContainer from '../ChatInputContainer/ChatInputContainer'

const ChatPanel = () => {
  return (
    <div className='chat__panel-conatainer' id='chat-container'>
      <ChatInputContainer />
    </div>
  )
}

export default ChatPanel
