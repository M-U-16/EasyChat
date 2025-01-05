import { v4 } from "uuid"
import sqlite3 from "sqlite3"
import { Socket } from "socket.io"

import getChat from "@/src/websocket/HelperGetChat"
import { logger } from "@/src/logger"
import { DbAll, DbRun } from "@/src/models/Db"
import {
    OnlineUserStorage
} from "@/src/websocket/OnlineUserStorage"

export interface ClientConnection {
    disconnect(): void
}

export function ClientConnection(
    sock: Socket,
    database: sqlite3.Database,
    online_storage: OnlineUserStorage,
    clean_up: (id: string) => void
): ClientConnection {
    const socket: Socket = sock
    let user_id: number = sock.data.user_id
    let id: string = sock.id
    let rooms: number[] = []
    let username: string = sock.data.username
    let currentRoom: number = -1
    let db: sqlite3.Database = database
    let online: OnlineUserStorage = online_storage

    socket.on(":get_chat", get_chat_event)
    socket.on(":join_room", join_room_event)
    socket.on(":send_message", send_message)
    socket.on("disconnect", disconnect_event)

    join_rooms()

    async function disconnect_event() {
        logger.info("user disconnected")
        online.get_rooms(user_id).then(rooms => {
            rooms.forEach(async(room) => {
                logger.debug("user offline broadcasting to:", {room: room})
                socket.broadcast.to(room.toString()).emit(
                    ":user_offline",
                    {room_id: room}
                )
            })
            online.remove(user_id)
        })

        clean_up(id)
    }

    async function get_chat_event(data: any, callback: Function) {
        try {
            const chat = await getChat(db, data.room_id, user_id)
            if (chat instanceof Error) {
                throw chat
            }
            //returns the messages of the room stored in messages table
            callback(chat)
        } catch(err) {
            logger.debug("get_chat_event: ", {error: err})
        }
    }

    async function join_room_event(data: any, callback: (data: any)=>{}) {
        join_room(data.room_id)

        //returns the messages of the room stored in messages table
        callback(await getChat(db, data.room_id, user_id))
    }
    
    async function join_room(room: number) {
        try {
            socket.join(room.toString())

            const users_online = await online.get_online_id(room, user_id)
            if (users_online instanceof Error) {
                throw users_online
            }

            //console.debug("ClientConnection.join_room:", users_online)

            if (users_online > 0) {
                // messaging other user in room that
                // new user is online
                socket.broadcast
                .to(room.toString())
                .emit(":user_online", {room_id: room})

                // messasing this user that other user is online
                socket.emit(":user_online", {room_id: room})
            }

            online.set(room, user_id)
        } catch(err) {
            logger.error("join_room:", {error: err})
        }
    }

    async function send_message(data: any, callback: Function) {
        try {
            // store message in database
            DbRun(db,
                "INSERT INTO messages"+
                "(room_id, message, user_id, created_at)"+
                "values (?, ?, ?, ?)",
                [data.room_id, data.message, user_id, data.date]
            )

            const message = {
                message: data.message,
                room_id: data.room_id,
                creation_date: data.date,
                user_id: user_id,
                username: username,
                uuid: v4(),
            }

            //sending message event to all clients
            socket.broadcast.to(data.room_id.toString()).emit(":new_message", message)
            callback(message)

        } catch(err) { logger.error(err) }
    }

    async function join_rooms() {
        try {
            let allRooms = await DbAll(
                db, "select room_id as id from participants where user_id=?",
                [user_id]
            )
            if (allRooms instanceof Error) {
                throw allRooms
            }
            
            allRooms = allRooms.map(room => room.id)
            allRooms.forEach(async(room) => {
                join_room(room)
            })

        } catch(err) {
            logger.error("ClientConnection.join_rooms:", err)
            socket.emit(":error", {error: "ERROR_JOINING_ROOMS"})
        }
    }

    function disconnect() {
        socket.disconnect()
    }

    return {
        disconnect
    }
}