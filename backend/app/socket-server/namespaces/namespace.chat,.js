const chat = (io) => {
    const chatNameSpace = io.of("/chat")
    chatNameSpace.on("connection", (socket) => {
        
    })
}