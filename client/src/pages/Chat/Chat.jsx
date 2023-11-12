import
React, 
{ 
  useEffect,
  useState,
  createContext
} from 'react'
import "./Chat.css"
import { Navbar } from '../../components'
import { SidePanel } from '../../components'
import { socket } from '../../SOCKET/socket.js'
import ChatPanel from '../../components/ChatPanel/ChatPanel'

export const chatContext = createContext()

const Chat = () => {
  const [isConnected, setIsConnected] = useState(socket.connected)
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState("")

  const sendMessage = () => {
    console.log("sending message")
    if (message == "") return // check if message is empty
    socket.emit(":send_message", message, () => { console.log("server got message") })
    setMessage("")
  }

  useEffect(() => {
    const connect = () => {
      socket.connect()
      setIsConnected(true)
    }
    const onDisconnect = () => setIsConnected(false)
    const onMessage = (message) => {
      console.log(message)
      setMessages(prev => [...prev, message])
      console.log("new message: ", message)
      //console.log("messages: ", messages)
    }

    socket.on("connect", () => { console.log("hello") })
    socket.on("disconnect", onDisconnect)
    socket.on("new_message", onMessage)
    //connecting to socket io server
    connect()
    //clean up function
    return () => {
      
      if (socket.connected) {
        //clearing connection
        socket.off("connect", () => { console.log("hello") })
        socket.off("disconnect", onDisconnect)
        socket.off("new_message", onMessage)
        //disconnecting from socket io server
        socket.disconnect()
      }
    }
  }, [])

  return (
    <>
      <Navbar />
      <div className='app__chat-container'>
        <chatContext.Provider value={{
          messages, setMessages, setMessage, sendMessage
        }}>
          <SidePanel />
          <ChatPanel />
        </chatContext.Provider>
      </div>
    </>
  )
}

export default Chat
