import cookieParser from "cookie-parser"
import bodyParser from "body-parser"
import express from "express"
import cors from "cors"
import http from "http"
import { Server } from "socket.io"

import SERVER_CONFIG from "./app/config/server.conf.js"
import validateToken from "./app/middleware/auth/validateToken.js"
import { userRoute } from "./app/routes/User.routes.js"

import {
    startingServer,
    corsOptions
} from "./app/config/server.conf.js"
import {
    socketConf
} from "./app/config/socket.server.conf.js"
import { registerChatHandler } from "./app/socket-server/handlers/handler.chat.js"
//creating express app
const app = express()
//creating http server
const server = http.createServer(app)
//creating websocket server on top of http server
export const io = new Server(server, socketConf)

//middleware
app.use(cookieParser())
app.use(express.json())
app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

//routes
app.use("/user", userRoute)

//sockets
io.on("connection", (socket) => {
    
})
io.of("/chat", (socket) => {
    registerChatHandler(io, socket)
})

server.listen(
    SERVER_CONFIG.port,
    SERVER_CONFIG.hostname,
    startingServer(
        SERVER_CONFIG.hostname,
        SERVER_CONFIG.port,
    )
)