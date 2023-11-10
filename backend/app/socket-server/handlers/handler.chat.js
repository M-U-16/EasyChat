import { auth } from "../middleware/socket-auth.js"

import sendMessageEvent from "../helpers/chat/sendMessage.js"
import joinRoomEvent from "../helpers/chat/join_room.js"
import setChatHeaders from "../helpers/chat/chatHeaders.js"

let currentRoom
export const registerChatHandler = (io, socket) => {
    
    io.engine.on("headers", setChatHeaders)
    socket.on(":join_room", (data, callback) => {
        joinRoomEvent(socket, data, callback)
    })
    socket.on(":send_message", sendMessageEvent)
    socket.on("disconnect", () => console.log("user disconnected"))
}