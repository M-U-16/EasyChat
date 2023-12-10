import dateFormat from "dateformat"
import getChat from "../helpers/helper.getChat.js"
import addMessage from "../helpers/helper.addMessage.js"
import formatMessage from "../helpers/chat/formatMessage.js"
import joinRoom from "../helpers/helpers.js"
import { v4 } from "uuid"

export const registerChatHandler = (socket) => {
    const online = {}
    //handeling users joining to specific rooms
    socket.on(":join_room", async(data, callback) => {
        try {
            //joins the socket to the room for realtime chatting
            joinRoom(
                socket,
                data.room_id,
                socket.data.currentRoom,
                socket.data.user_id,
                (room) =>{
                    socket.data.currentRoom = room
                }
            )
            //returns the messages of the room stored in messages table
            callback(await getChat(data.room_id, socket.data.user_id))
        } catch(err) { console.log(err) }
    })
    socket.on(":send_message", async(data, callback) => {
        try {
            addMessage({
                query_vars: [
                    socket.data.currentRoom,
                    data.message,
                    socket.data.user_id,
                    dateFormat(data.date, "yyyy-mm-dd HH:MM:ss")
                ]
            })
            const formatedMessage = await formatMessage(
                data.message,
                dateFormat(data.date, "yyyy-mm-dd HH:MM:ss"),
                socket.data.user_id,
                v4()
            )
            //sending message event to all clients
            socket.broadcast.to(socket.data.currentRoom).emit("new_message", formatedMessage)
            //socket.io.of("/chat-server").to(socket.data.currentRoom).emit("new_message", formatedMessage)
            callback(await formatMessage(
                data.message,
                dateFormat(data.date, "yyyy-mm-dd HH:MM:ss"),
                socket.data.user_id,
                v4(),
                true
            ))

        } catch(err) { console.log(err) }
    })
    //socket.on("disconnect", () => console.log("user disconnected"))
}