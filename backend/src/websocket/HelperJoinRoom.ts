import { Socket } from "socket.io"
import { checkRoom } from "./middleware/UserCheckRoom.js"
import sqlite3 from "sqlite3"

async function joinRoom(
    db: sqlite3.Database,
    socket: Socket,
    room: number,
    currentRoom: number,
    user_id: number
) {
    if (room == currentRoom) return

    if (await checkRoom(db, room, user_id)) {
        if (currentRoom != -1) socket.leave(currentRoom.toString())
        socket.join(room.toString())
        socket.broadcast.to(room.toString()).emit("user_online")
        return room
    }

    return currentRoom
}

export default joinRoom