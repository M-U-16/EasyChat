import React, { useRef, useContext, useEffect } from 'react'
import "./ChatInputContainer.css"
import { icons } from '../../constants'
import socket from '../../SOCKET/socket.js'
import { chatContext } from '../../pages/Chat/Chat'


const ChatInputContainer = () => {

  const chatInput = useRef()
  const chatButton = useRef()
  const chat = useContext(chatContext)
  const updateInput = () => chat.setMessage(chatInput.current.value)
  
  const sendMessage = () => {
    chatInput.current.value = ""
    chat.sendMessage()
  }
  const checkEnter = (e) => e.key == "Enter" ?sendMessage():null 

  return (
    <div className='chat__input-container'>
      <div className="chat__input-wrapper">
        <input
          className='chat__input'
          type="text"
          onChange={updateInput}
          ref={chatInput}
          placeholder='Nachricht Senden...'
          onKeyDown={checkEnter}
        />
        <button
          className='chat__input-send-btn'
          ref={chatButton}
          onClick={sendMessage}
        >
          <img src={icons.sendIcon} />
        </button>
      </div>
    </div>
  )
}
export default ChatInputContainer
