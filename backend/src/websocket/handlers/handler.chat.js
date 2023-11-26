import { joinRoom } from "../helpers/helpers.js"
import { encryptToken } from "../../helpers/JWT.js"
import getChat from "../helpers/helper.getChat.js"

export const registerChatHandler = (io, socket) => {
    let currentRoom
    const online = {}
    
    //handeling users joining to specific rooms
    socket.on(":join_room", async(data, callback) => {
        try {
            const user_id = socket.data.user_id
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
        } catch(err) { console.log(err) }
    })
    socket.on(":send_message", (data, callback) => {
        try {
            io.of("/chat").to(currentRoom).emit("new_message", data)
        } catch(err) { console.log(err) }
    })
    socket.on("disconnect", () => console.log("user disconnected"))
}