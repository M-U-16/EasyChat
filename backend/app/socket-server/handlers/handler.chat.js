import { checkRoom } from "../middleware/checkRoom.js"
import { parse, serialize } from "cookie"
import { v4 as uuidv4 } from "uuid"

import { encryptToken } from "../../helpers/JWT.js"

export const registerChatHandler = (io, socket) => {
    console.log("user connected")
    const cookieRegex = /=(.*)/
    let currentRoom
    
    io.engine.on("headers", (headers, req) => {
        if (!req.headers.cookie) return
        const cookies = parse(req.headers.cookie)
        if (!cookies.randomId) {
            headers["set-cookie"] = serialize("randomId", uuidv4(), { maxAge: 86400 })
        }
    })

    const joinRoom = (room) => {
        if (room == currentRoom) return

        const TOKEN = socket.handshake.headers.cookie.match(cookieRegex)[1]
        const user_id = encryptToken(TOKEN).user_id
        if (checkRoom(room, user_id)) {
            leaveRoom(currentRoom)
            socket.join(room)
            socket.broadcast.to(room).emit("user_online")
            currentRoom = room
        }
    }
    const leaveRoom = (room) => {
        if (!room) return
        socket.leave(room)
    }
    socket.on(":join_room", (data) => {
        joinRoom(data.room_id)
    })

    socket.on("disconnect", () => console.log("user disconnected"))
}