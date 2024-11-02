import { io } from 'socket.io-client'

const socket = io(
    "http://localhost:3000/chat-server", {
        autoConnect: false,
        withCredentials: true,
        transports: ["websocket"],
        path: "/api/chat"
    }
)
export default socket