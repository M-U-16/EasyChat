import React,
{ useContext,
  useEffect,
  useRef
} from 'react'
import Message from '../Message/Message'
import "./MessagesContainer.css"
import { chatContext } from '../../pages/Chat/Chat'

const MessagesContainer = () => {
  const { messages } = useContext(chatContext)
  const bottom = useRef(null)
  const container = useRef(null)
  
  useEffect(() => {
    if (bottom.current) {
      bottom.current.scrollIntoView({behavior: "smooth"})
    }
  }, [])

  useEffect(() => {
    bottom.current.scrollIntoView({behavior: "smooth"})
  }, [messages])

  return (
    <div
      className='chat__messages-container'
      ref={container}
    >
      {
        messages &&
        messages.map((item, index) => <Message key={index} messageObj={item} />)
      }
      <div ref={bottom}></div>
    </div>
  )
}

export default MessagesContainer
