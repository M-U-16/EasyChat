import { io } from 'socket.io-client'

const socket = io(
    "/chat-server", {
        autoConnect: false,
        withCredentials: true,
        transports: ["websocket"],
        path: "/socket.io",
        secure: false,
        sameSite: "none"
    }
)

export default socket