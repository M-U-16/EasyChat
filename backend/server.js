import cookieParser from "cookie-parser"
import bodyParser from "body-parser"
import express from "express"
import cors from "cors"
import http from "http"
import "dotenv/config"
import { Server as SocketIoServer } from "socket.io"

//importing config files
import { socketConf } from "./config/socket.server.conf.js"
import { apiRoute as apiRouter } from "./src/routes/api.js"

import {
    startingServer,
    corsOptions
} from "./config/server.conf.js"

import { auth } from "./src/websocket/middleware/auth.socket.js"
import { registerChatHandler } from "./src/websocket/handler.chat.js"

//creating express app
const app = express()
//creating http server
const server = http.createServer(app)
//creating websocket server on top of http server
export const io = new SocketIoServer(server, socketConf)

//middleware and configuration
app.use(express.static("public"))
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

server.listen(
    process.env.SERVER_PORT,
    process.env.SERVER_HOSTNAME,
    startingServer(
        process.env.SERVER_HOSTNAME,
        process.env.SERVER_PORT,
    )
)