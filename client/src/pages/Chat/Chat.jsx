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
import socket from '../../SOCKET/socket.js'
import ChatPanel from '../../components/ChatPanel/ChatPanel'
import LogoutButton from '../../elements/Buttons/LogoutButton/LogoutButton.jsx'

export const chatContext = createContext()

const Chat = () => {
  const [isConnected, setIsConnected] = useState(socket.connected)
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState("")
  const [currentChat, setCurrentChat] = useState(null)
  const [prevChat, setPrevChat] = useState(null)

  const sendMessage = () => {
    if (message == "") return // check if message is empty
    socket.emit(":send_message",
      {message: message, date: new Date().toLocaleString()}, //message object with date
      (res) => { newMessage(res) } //callback function
    )
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

  const newMessage = (new_message) => {
    //setting new message to messages state
    //accounting for multiple renders and double messages
    setMessages(prev => {
      const filterd_uuids = prev
        .map(item => item.uuid)
        .filter(uuid => uuid !== null)

      if (filterd_uuids.includes(new_message.uuid)) return prev
      return [...prev, new_message]
    })
  }

  useEffect(() => {
    if (currentChat != null) joinChat(currentChat)
  }, [currentChat])

  useEffect(() => {
    const connect = () => {
      socket.connect()
      setIsConnected(true)
    }
    const onDisconnect = () => setIsConnected(false)

    socket.on("disconnect", onDisconnect)
    socket.on("new_message", newMessage)
    socket.on("user_online", () => console.log("user online"))
    //connecting to socket io server
    connect()
    //clean up function
    return () => {
      
      if (socket.connected) {
        //clearing connection
        socket.removeAllListeners()
        //disconnecting from socket io server
        socket.disconnect()
      }
    }
  }, [])

  return (
    <>
      <Navbar>
        <LogoutButton />
      </Navbar>
      <div className='app__chat-container'>
        {/* context for messages and functions */}
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
