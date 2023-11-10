import React, { useState, useRef } from 'react'
import "./ChatInputContainer.css"
import { icons } from '../../constants'
import { socket } from '../../SOCKET/socket'

const ChatInputContainer = () => {

  const chatInput = useRef()
  const [message, setMessage] = useState("")
  const updateMessage = () => setMessage(chatInput.current.value)

  const sendMessage = () => {
    if (message == "") return // check if message is not empty
    socket.emit(":send_message", message)
    console.log(message)
    setMessage("")
    chatInput.current.value = ""
  }

  return (
    <div className='chat__input-container'>
      <div className="chat__input-wrapper">
        <input
          className='chat__input'
          type="text"
          onChange={updateMessage}
          ref={chatInput}
          placeholder='Nachricht Senden...'
        />
        <button className='chat__input-send-btn' onClick={sendMessage}>
          <img src={icons.sendIcon} />
        </button>
      </div>
    </div>
  )
}
export default ChatInputContainer
