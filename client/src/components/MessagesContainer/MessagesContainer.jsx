import React,
{ useContext, useEffect } from 'react'
import "./MessagesContainer.css"
import { chatContext } from '../../pages/Chat/Chat'

const MessagesContainer = () => {
  const chat = useContext(chatContext)

  useEffect(() => {
    //console.log(chat.messages)

  }, [chat.messages])

  return (
    <div className='chat__messages-container'>
      
    </div>
  )
}

export default MessagesContainer
