import { joinRoom } from "../helpers/helpers.js"
import { encryptToken } from "../../helpers/JWT.js"
import getChat from "../helpers/helper.getChat.js"

import sendMessageEvent from "../helpers/chat/sendMessage.js"
import setChatHeaders from "../helpers/chat/chatHeaders.js"
import joinRoomEvent from "../helpers/chat/join_room.js"

export const registerChatHandler = (io, socket) => {
    let currentRoom
    const online = {}
    
    io.engine.on("headers", setChatHeaders)
    //handeling users joining to specific rooms
    socket.on(":join_room", async(data, callback) => {
        const cookieRegex = /=(.*)/
        const TOKEN = socket.handshake.headers.cookie.match(cookieRegex)[1]
        const user_id = encryptToken(TOKEN).user_id
        const room = data.room_id
        
        //joins the socket to the room for realtime chatting
        joinRoom(
            socket,
            room,
            currentRoom,
            user_id,
            (room) => currentRoom = room
        )
        //returns the messages of the room stored in messages table
        callback(await getChat(room, user_id))
    })
    socket.on(":send_message", sendMessageEvent)
    socket.on("disconnect", () => console.log("user disconnected"))
}