import { io } from 'socket.io-client'
import {
    PUBLIC_API_URL
} from "$env/static/public"

const socket = io(
    PUBLIC_API_URL + "/chat-server", {
        autoConnect: false,
        withCredentials: true,
        transports: ["websocket"],
        path: "/api/socket.io",
        secure: false,
        sameSite: "none"
    }
)

export default socket