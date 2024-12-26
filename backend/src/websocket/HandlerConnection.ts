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
    _socket: Socket;
    _user_id: number;
    _rooms: number[];
    _username: string;
    _db: sqlite3.Database;
    _online: OnlineUserStorage;
    _currentRoom: number;

    disconnect(): void
}

export function ClientConnection(
    sock: Socket,
    database: sqlite3.Database,
    online: OnlineUserStorage,
    clean_up: (id: string) => void
): ClientConnection {
    const _socket: Socket = sock
    let _user_id: number = sock.data.user_id
    let _id: string = sock.id
    let _rooms: number[] = []
    let _username: string = sock.data.username
    let _currentRoom: number = -1
    let _db: sqlite3.Database = database
    let _online: OnlineUserStorage = online

    _socket.on(":get_chat", get_chat_event)
    _socket.on(":join_room", join_room_event)
    _socket.on(":send_message", send_message)
    _socket.on("disconnect", disconnect_event)

    join_rooms()

    async function disconnect_event() {
        logger.info("user disconnected")
        _online.get_rooms(_user_id).then(rooms => {
            rooms.forEach(async(room) => {
                logger.debug("user offline broadcasting to:", {room: room})
                _socket.broadcast.to(room.toString()).emit(
                    ":user_offline",
                    {room_id: room}
                )
            })
            _online.remove(_user_id)
        })

        clean_up(_id)
    }

    async function get_chat_event(data: any, callback: Function) {
        try {
            const chat = await getChat(_db, data.room_id, _user_id)
            console.debug("ClientConnection.get_chat_event:", chat)
            //returns the messages of the room stored in messages table
            callback(chat)
        } catch(err) {
            logger.error(err)
        }
    }

    async function join_room_event(data: any, callback: (data: any)=>{}) {
        join_room(data.room_id)

        //returns the messages of the room stored in messages table
        callback(await getChat(_db, data.room_id, _user_id))
    }
    
    async function join_room(room: number) {
        try {
            _socket.join(room.toString())

            const online = await _online.get_online_id(room, _user_id)
            if (online instanceof Error) {
                throw new Error()
            }
            console.debug("ClientConnection.join_room:", online)

            if (online > 0) {
                // messaging other user in room that
                // new user is online
                _socket.broadcast
                .to(room.toString())
                .emit(":user_online", {room_id: room})

                // messasing this user that other user is online
                _socket.emit(":user_online", {room_id: room})
            }

            _online.set(room, _user_id)
        } catch(err) { console.error(err) }
    }

    async function send_message(data: any, callback: Function) {
        try {
            // store message in database
            DbRun(_db,
                "INSERT INTO messages"+
                "(room_id, message, user_id, created_at)"+
                "values (?, ?, ?, ?)",
                [data.room_id, data.message, _user_id, data.date]
            )

            const message = {
                message: data.message,
                room_id: data.room_id,
                creation_date: data.date,
                user_id: _user_id,
                username: _username,
                uuid: v4(),
            }

            //sending message event to all clients
            //console.log(data.room_id, typeof(data.room_id))
            _socket.broadcast.to(data.room_id.toString()).emit(":new_message", message)
            callback(message)

        } catch(err) { logger.error(err) }
    }

    async function join_rooms() {
        try {
            let allRooms = await DbAll(
                _db, "select room_id as id from participants where user_id=?",
                [_user_id]
            ).then((rooms) => rooms.map(room => room.id))

            allRooms.forEach(async(room) => {
                join_room(room)
            })

        } catch(err) {
            console.error("ClientConnection.join_rooms:", err)
            _socket.emit(":error", {error: "ERROR_JOINING_ROOMS"})
        }
    }

    function disconnect() {
        _socket.disconnect()
    }

    return {
        _socket,
        _user_id,
        _rooms,
        _username,
        _currentRoom,
        _db,
        _online,
        disconnect
    }
}