const sendMessageEvent = (socket, data, currentRoom, callback) => {
    socket.broadcast.to(currentRoom).emit("new_message", data)
    callback()
}
export default sendMessageEvent