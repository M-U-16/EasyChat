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
        console.log("join: ", currentRoom)
        if (currentRoom) socket.leave(currentRoom)
        socket.join(room)
        console.log(socket.rooms)
        socket.broadcast.to(room).emit("user_online")
        
        setCurrentRoom(room)
    }
}