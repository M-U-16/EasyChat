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
  const [currentChat, setCurrentChat] = useState(null)
  const [prevChat, setPrevChat] = useState(null)

  const sendMessage = () => {
    if (message == "") return // check if message is empty
    console.log(new Date().toLocaleString())
    socket.emit(":send_message",
      {content: message, date: new Date().toLocaleString()}, //message object with date
      () => { console.log("server got message") //callback
    })
    setMessage("")
  }

  const joinChat = (room_id) => {
    if (currentChat != prevChat) {
      socket.emit(":join_room", {room_id: room_id}, (response) => {
        setMessages(response.messages)
        setPrevChat(room_id)
      })
    }
  }

  useEffect(() => {
    if (currentChat != null) joinChat(currentChat)
  }, [currentChat])

  useEffect(() => {
    const connect = () => {
      console.log("connecting")
      socket.connect()
      setIsConnected(true)
    }
    const onDisconnect = () => setIsConnected(false)
    const onMessage = (message) => { console.log(message) }

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
          messages,
          setMessages,
          setMessage,
          sendMessage,
          setCurrentChat,
          currentChat,
          joinChat
        }}>
          <SidePanel />
          <ChatPanel />
        </chatContext.Provider>
      </div>
    </>
  )
}

export default Chat
