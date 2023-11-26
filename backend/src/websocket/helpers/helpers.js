import { checkRoom } from "../middleware/checkRoom.js"

export const joinRoom = async(
    socket,
    room,
    currentRoom,
    user_id,
    setCurrentRoom
) => {
    if (room == currentRoom) return
    
    if (await checkRoom(room, user_id)) {
        if (currentRoom) socket.leave(currentRoom)
        socket.join(room)
        socket.broadcast.timeout(5000).to(room).emit("user_online")
        setCurrentRoom(room)
    }
}