import { socket } from "./socket"

export const joinChat = (
    room_id,
    currentRoom,
    socketCa,
    ca
) => {
    if (room != currentRoom) {
        socket.emit(":join_room", {room_id: room_id}, socketCa)
        ca(room_id)
    }
}