import "dotenv/config"

import fs from "fs"
import os from "os"
import cors from "cors"
import http from "http"
import process from "process"
import sqlite3 from "sqlite3"
import express from "express"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import { Server as SocketIoServer, Socket } from "socket.io"

import { logger } from "@/src/logger"
import {
    create_default, get_db_path
} from "@/src/models"

import { apiRouter } from "@/src/routes/Api"
import { open_database } from "./src/models/Db"
import { auth } from "@/src/websocket/middleware/AuthSocket"
import { ClientConnection } from "@/src/websocket/HandlerConnection"
import { NewOnlineStorage } from "./src/websocket/OnlineUserStorage"
import path from "path"

try {
    await (async function() {
        if (!process.env.DATA_DIR) {
            logger.warn("No DATA_DIR using temporary directory.")
            let dir_path = fs.mkdtempSync(path.join(os.tmpdir(), "easychat-"))
            process.env.DATA_DIR = dir_path
            process.env.RUNNING_ON_TEMP = "true"
        }

        logger.debug(get_db_path())
        await create_default(get_db_path())
    })()

    let path_data_dir = path.join(
        process.env.DATA_DIR,
        "users"
    )
    if (!fs.existsSync(path_data_dir)) {
        fs.mkdirSync(
            path_data_dir,
            {recursive: true}
        )
    }

    let path_group_dir = path.join(
        process.env.DATA_DIR,
        "groups"
    )

    if (!fs.existsSync(path_group_dir)) {
        fs.mkdirSync(
            path_group_dir,
            {recursive: true}
        )
    }
    
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
    db.close()

    if (process.env.RUNNING_ON_TEMP == "true") {
        logger.info("removing temporary directory")
        logger.debug(process.env.DATA_DIR)
        fs.rmSync(process.env.DATA_DIR, {recursive: true, force:true})
    }

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
            delete connections[id]
        }
    )
})

const SD_LISTEN_FDS_START = 3
let listen_pid = parseInt(process.env.LISTEN_PID);
if (!listen_pid) {
    listen_pid = 0
}
let listen_fds = parseInt(process.env.LISTEN_FDS);
if (!listen_fds) {
    listen_fds = 0
}
if (listen_pid !== 0 && listen_pid !== process.pid) {
	throw new Error(`received LISTEN_PID ${listen_pid} but current process id is ${process.pid}`);
}
if (listen_fds > 1) {
    throw new Error(`only one socket is allowed for socket activation, but LISTEN_FDS was set to ${listen_fds}`);
}

let socket_activation = listen_pid === process.pid && listen_fds === 1;

try {
    if (socket_activation) {
        server.listen(SD_LISTEN_FDS_START, ()=>{})
    } else if (process.env.SOCKET_PATH) {
        server.listen(process.env.SOCKET_PATH)
    } else if (process.env.PORT && process.env.HOST) {
        server.listen(parseInt(process.env.PORT), process.env.HOST)
    } else {
        throw new Error("No UDS, FD or HOST and PORT pair!")
    }
} catch(error) {
    logger.error("index.ts:", {error: error})
    process.exit(1)
}