import { io } from 'socket.io-client'

const URL = "http://localhost:3000/chat"
export const socket = io(URL, {
    autoConnect: false,
    withCredentials: true,
    extraHeaders: {
        "Send-Credentials": ""
    },
    transports: ['websocket', 'polling', 'flashsocket']
})