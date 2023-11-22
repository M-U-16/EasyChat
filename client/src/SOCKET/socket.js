import { io } from 'socket.io-client'

const URL ="http://localhost:3000/chat-server"
export const socket = io(URL, {
    autoConnect: false,
    withCredentials: true,
    transports: ["websocket"],
    path: "/api/socket"
})