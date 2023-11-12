const sendMessageEvent = (socket, data, currentRoom, callback) => {
    console.log(data)
    socket.broadcast.to(currentRoom).emit("new_message", data)
    callback()
}
export default sendMessageEvent