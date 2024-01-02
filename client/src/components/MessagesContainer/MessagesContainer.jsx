import React,
{ useContext,
  useEffect,
  useRef
} from 'react'
import Message from '../Message/Message'
import "./MessagesContainer.css"
import { chatContext } from '../../pages/Chat/Chat'

const MessagesContainer = () => {
  const { messages, currentChat } = useContext(chatContext)
  const bottom = useRef(null)
  const container = useRef(null)

  const scrollToBottomSmooth = () => {
    container.current.style.scrollBehavior = "smooth"
    container.current.scrollTop = container.current.scrollHeight
    container.current.style.scrollBehavior = "instant"
  }
  const scrollToBottomInstant = () => {
    container.current.style.scrollBehavior = "instant"
    container.current.scrollTop = container.current.scrollHeight
  }
  
  useEffect(() => {
    //bottom.current.scrollIntoView({behavior: "smooth"})
  }, [currentChat])
  
  useEffect(() => {
    //console.log(container.current.scrollHeight)
    //container.current.style.scrollBehaviour
    /* bottom.current.scrollIntoView({behavior: "smooth"}) */
    scrollToBottomSmooth()
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
