import
React, 
{ 
  useEffect,
  useState,
  createContext
} from 'react'

import { Navigate } from 'react-router-dom'

import "./Chat.css"
import { Navbar } from '../../components'
import { SidePanel } from '../../components'
import { socket } from '../../SOCKET/socket.js'
import { backendConfig } from '../../constants'
import { checkLoggedIn } from '../../SERVER/checkAuth'
import ChatPanel from '../../components/ChatPanel/ChatPanel'

export const messagesContext = createContext()

const Chat = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [messages, setMessages] = useState(null)

  useEffect(() => {
    checkLoggedIn(
      backendConfig.user.isLoggedIn.url,
      backendConfig.user.isLoggedIn.method,
      (message) => {
        if (message.redirect) return setIsLoggedIn(false)
        if (!message.redirect) return socket.connect()
      }
    )
    return () => { if (isLoggedIn) socket.disconnect() }
  }, [])

  return (
    <>
      <Navbar />
      <div className='app__chat-container'>
        <messagesContext.Provider value={{messages, setMessages}}>
          <SidePanel />
          <ChatPanel />
        </messagesContext.Provider>
      </div>
      {!isLoggedIn && <Navigate to={"/login"} replace={true} />}
    </>
  )
}

export default Chat
