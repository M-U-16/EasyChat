import fs from "fs"
import "dotenv/config"
import path from "path"
import { logger } from "#root/logger.js"
import { check_env, create_default, get_db_path } from "#root/src/models/default.js"

import cors from "cors"
import http from "http"
import express from "express"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import { Server as SocketIoServer } from "socket.io"

import { apiRoute as apiRouter } from "#root/src/routes/api.js"
import { auth } from "#root/src/websocket/middleware/auth.socket.js"
import { registerChatHandler } from "#root/src/websocket/handler.chat.js"

// if listening on linux domain socket
// delete old file if it exists to prevent
// ERRADDRINUSE
if (process.env.SOCKET_PATH) {
    const path = process.env.SOCKET_PATH
    if (fs.existsSync(path)) {
        fs.unlinkSync(path)
    }
}

try {
    check_env()
    create_default(get_db_path())
} catch(err) {
    logger.error(err)
    process.exit(1)
}

//creating express app
const app = express()
//creating http server
const server = http.createServer(app)
//creating websocket server on top of http server
export const io = new SocketIoServer(server, {
    cors: {
        origin: false,
        allowedHeaders: [
            "Access-Control-Allow-Credentials",
            "Send-Credentials"
        ],
        crendentials: true,
        methods: ["GET", "POST"],
    },
    ackTimeout: 10000,
    retries: 3,
    path: "/socket.io",
    cookie: {
        name: "io",
        path: "/",
        httpOnly: true,
        sameSite: "Strict"
    }
})

function CloseServer() {
    server.close(() => {
        if (process.env.SOCKET_PATH) {
            fs.unlinkSync(process.env.SOCKET_PATH)
        }
    })
}

process.on("SIGINT", CloseServer)
process.on("SIGTERM", CloseServer)

//middleware and configuration
app.use(express.json())
app.use(cors({
    credentials: true,
    exposedHeaders: [
        "Access-Control-Allow-Origin",
        "Set-Cookie",
        "Authorization",
        "Origin",
        "X-Requested-With",
        "Content-Type",
        "Accept",
        
    ],
    origin: true
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(cookieParser())
app.set("trust proxy", 1)

app.use(express.static("static"))

//routes
app.use("/api", apiRouter)

//websockets
io.of("/chat-server").use(auth)
io.of("/chat-server").on("connection", (socket) => {
    socket.io = io
    registerChatHandler(socket)
})

try {
    if (process.env.SOCKET_PATH) {
        server.listen(process.env.EASYCHAT_SOCKET_PATH)
    } else if (process.env.PORT && process.env.HOSTNAME) {
        server.listen(
            process.env.PORT,
            process.env.HOSTNAME
        )
    } else {
        throw new Error("No UNS or HOSTNAME and PORT pair!")
    }
} catch(error) {
    logger.error(error)
    process.exit(1)
}