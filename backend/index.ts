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
    /* crendentials: true, */
    /* ackTimeout: 10000, */
    /* retries: 3, */
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

app.use("/api", apiRouter)

//websockets
io.of("/chat-server").use(auth)
io.of("/chat-server").on("connection", (socket: Socket) => {
    if (!socket.data.user_id) {
        logger.error("socket connection: no user_id")
        return
    }

    new ClientConnection(socket)
})

try {
    if (process.env.SOCKET_PATH) {
        server.listen(process.env.EASYCHAT_SOCKET_PATH)
    } else if (process.env.PORT && process.env.HOSTNAME) {
        server.listen(
            parseInt(process.env.PORT),
            process.env.HOSTNAME,()=>{}
        )
    } else {
        throw new Error("No UNS or HOSTNAME and PORT pair!")
    }
} catch(error) {
    logger.error(error)
    process.exit(1)
}