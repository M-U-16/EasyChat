import React, { useRef, useContext, useEffect } from 'react'
import "./ChatInputContainer.css"
import { icons } from '../../constants'
import { socket } from '../../SOCKET/socket'
import { chatContext } from '../../pages/Chat/Chat'


const ChatInputContainer = () => {

  const chatInput = useRef()
  const chatButton = useRef()
  const chat = useContext(chatContext)
  const updateMessage = () => chat.setMessage(chatInput.current.value)
  
  const sendMessage = () => {
    console.log("button click")
    chatInput.current.value = ""
    chat.sendMessage()
  }

  useEffect(() => {
    
  }, [])

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
