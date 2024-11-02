import { checkRoom } from "./middleware/user.checkRoom.js"

async function joinRoom(
    socket,
    room,
    currentRoom,
    user_id
) {
    if (room == currentRoom) return

    if (await checkRoom(room, user_id)) {
        if (currentRoom != -1) socket.leave(currentRoom)
        socket.join(room)
        socket.broadcast.to(room).emit("user_online")
        return room
    }

    return currentRoom
}

export default joinRoom