import { checkRoom } from "../middleware/checkRoom.js"

const leaveRoom = (socket, room) => {
    if (!room) return
    socket.leave(room)
}
export const joinRoom = async(socket, room, currentRoom, user_id) => {
    if (room == currentRoom) return
    
    if (await checkRoom(room, user_id)) {
        leaveRoom(currentRoom)
        socket.join(room)
        socket.broadcast.to(room).emit("user_online")
        currentRoom = room
    }
}