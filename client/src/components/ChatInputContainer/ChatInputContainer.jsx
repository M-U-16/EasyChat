import React, { useState, useRef } from 'react'
import "./ChatInputContainer.css"
import { icons } from '../../constants'

const ChatInputContainer = () => {

  const chatInput = useRef()
  const [message, setMessage] = useState("")
  const updateMessage = () => setMessage(chatInput.current.value)

  return (
    <div className='chat__input-container'>
        <div className="chat__input-wrapper">
            <input
              className='chat__input'
              type="text"
              onChange={updateMessage}
              ref={chatInput}
            />
            <button className='chat__input-send-btn'>
                <img src={icons.sendIcon} />
            </button>
        </div>
    </div>
  )
}
export default ChatInputContainer
