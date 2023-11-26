import { joinRoom } from "../helpers/helpers.js"
import getChat from "../helpers/helper.getChat.js"

export const registerChatHandler = (io, socket) => {
    let currentRoom
    const online = {}
    
    //handeling users joining to specific rooms
    socket.on(":join_room", async(data, callback) => {
       console.log(data.room_id)
        try {
            //joins the socket to the room for realtime chatting
            joinRoom(
                socket,
                data.room_id,
                currentRoom,
                socket.data.user_id,
                (room) => currentRoom = room
            )
            
            //returns the messages of the room stored in messages table
            callback(await getChat(data.room_id, socket.data.user_id))
        
        } catch(err) { console.log(err) }
    })
    socket.on(":send_message", (message, callback) => {
        try {
            console.log({
                user: socket.data.user_id,
                currentRoom,
                message,
            })
            socket.to(currentRoom).emit("new_message", message)
        } catch(err) { console.log(err) }
    })
    socket.on("disconnect", () => console.log("user disconnected"))
}