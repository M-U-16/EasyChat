import fs from "fs"
import "dotenv/config"
if (process.env.SOCKET_PATH) {
    const path = "/var/tmp/"+process.env.SOCKET_PATH
    fs.existsSync(path) && fs.unlinkSync(path)
}
import cors from "cors"
import http from "http"
import express from "express"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import { Server as SocketIoServer } from "socket.io"

//importing config files
import { socketConf } from "./config/socket.server.conf.js"
import { apiRoute as apiRouter } from "./src/routes/api.js"
import { corsOptions } from "./config/server.conf.js"
import { auth } from "./src/websocket/middleware/auth.socket.js"
import { registerChatHandler } from "./src/websocket/handler.chat.js"

//creating express app
const app = express()
//creating http server
const server = http.createServer(app)
//creating websocket server on top of http server
export const io = new SocketIoServer(server, socketConf)

//middleware and configuration
app.use(express.json())
app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(cookieParser())
app.set("trust proxy", 1)

//routes
app.use("/api", apiRouter)

//sockets
io.of("/chat-server").use(auth)
io.of("/chat-server").on("connection", (socket) => {
    socket.io = io
    registerChatHandler(socket)
})

try {
    if (process.env.SOCKET_PATH) {
        server.listen(process.env.EASYCHAT_SOCKET_PATH)
    } else {
        server.listen(
            process.env.SERVER_PORT,
            process.env.SERVER_HOSTNAME
        )
    }
} catch(error) {
    process.exit(-1)
} 