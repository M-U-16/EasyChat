import "dotenv/config"

import fs from "fs"
import cors from "cors"
import http from "http"
import sqlite3 from "sqlite3"
import express from "express"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import { Server as SocketIoServer, Socket } from "socket.io"

import { logger } from "@/src/logger"
import {
    check_env,
    create_default, get_db_path
} from "@/src/models"

import { apiRouter } from "@/src/routes/Api"
import { open_database } from "./src/models/Db"
import { auth } from "@/src/websocket/middleware/AuthSocket"
import { ClientConnection } from "@/src/websocket/HandlerConnection"
import { NewOnlineStorage } from "./src/websocket/OnlineUserStorage"

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
    process.exit(1)
}

const db = open_database(get_db_path(), sqlite3.OPEN_READWRITE)

//creating express app
const app = express()

//creating http server
const server: http.Server = http.createServer(app)

//creating websocket server on top of http server
export const io = new SocketIoServer(server, {
    cors: {
        origin: false,
        allowedHeaders: [
            "Access-Control-Allow-Credentials",
            "Send-Credentials"
        ],
        methods: ["GET", "POST"],
    },
    path: "/socket.io",
    cookie: {
        name: "io",
        path: "/",
        httpOnly: true,
        sameSite: "strict"
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

app.set("db", db)
app.use("/api", apiRouter)

const OnlineUsers = NewOnlineStorage()
const connections = {}

//websockets
io.of("/chat-server").use(auth)
io.of("/chat-server").on("connection", (socket: Socket) => {
    connections[socket.id] = ClientConnection(
        socket, db, OnlineUsers,
        function(id: string) {
            //console.debug("Deleting Socket:", id)
            delete connections[id]
        }
    )
})

try {
    if (process.env.SOCKET_PATH) {
        server.listen(process.env.EASYCHAT_SOCKET_PATH)
    } else if (process.env.PORT && process.env.HOST) {
        server.listen(
            parseInt(process.env.PORT),
            process.env.HOST,()=>{}
        )
    } else {
        throw new Error("No UNS or HOST and PORT pair!")
    }
} catch(error) {
    logger.error(error)
    process.exit(1)
}