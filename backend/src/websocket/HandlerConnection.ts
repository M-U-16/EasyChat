import { v4 } from "uuid"
import sqlite3 from "sqlite3"
import { Socket } from "socket.io"

import getChat from "@/src/websocket/HelperGetChat"
import { logger } from "@/src/logger"
import joinRoom from "@/src/websocket/HelperJoinRoom"
import { DbAll, DbRun } from "@/src/models/Db"

export class ClientConnection {
    public sock: Socket
    public user_id: number
    public currentRoom: number
    public username: string
    public rooms: number[]
    public online: Map<number, number>
    private db: sqlite3.Database

    public constructor(sock: Socket) {
        this.sock = sock
        this.user_id = sock.data.user_id
        this.currentRoom = -1

        //handeling users joining to specific rooms
        this.sock.on(":get_chat", this.get_chat)
        this.sock.on(":join_room", this.join_room)
        this.sock.on("disconnect", this.disconnect_event)
        this.sock.on(":send_message", this.send_message)
    }

    public async disconnect_event() {
        logger.info("user disconnected")
        this.rooms.forEach(room => {
            if (this.online.get(room) == 1) {
                this.online.delete(room)
            } else {
                this.online.set(room, 1)
                this.sock.broadcast.to(room.toString()).emit(
                    ":user_offline",
                    {room_id: room}
                )
            }
        })
    }

    public async get_chat(data: any, callback: Function) {
        try {
            //returns the messages of the room stored in messages table
            callback(await getChat(this.db, data.room_id, this.user_id))
        } catch(err) { logger.error(err)}
    }

    public async join_room(data: any, callback: (data: any)=>{}) {
        try {
            await joinRoom(
                this.db,
                this.sock,
                data.room_id,
                this.currentRoom,
                this.user_id,
            )

            //returns the messages of the room stored in messages table
            callback(await getChat(this.db, data.room_id, this.user_id))
        } catch(err) { logger.error(err) }
    }

    public async send_message(data: any, callback: Function) {
        try {
            DbRun(this.db,
                "INSERT INTO messages"+
                "(room_id, message, user_id, created_at)"+
                "values (?, ?, ?, ?)",
                [data.room_id, data.message, this.user_id, data.date]
            ) // store message in database

            const message = {
                message: data.message,
                room_id: data.room_id,
                creation_date: data.date,
                user_id: this.user_id,
                username: this.username,
                uuid: v4(),
            }
            
            //sending message event to all clients
            this.sock.broadcast.to(data.room_id).emit(":new_message", message)
            callback(message)

        } catch(err) { logger.error(err) }
    }

    public async join_rooms(db: sqlite3.Database, online: any) {
        try {
            let allRooms = await DbAll(
                db, 
                "select room_id as id from participants where user_id=?",
                [this.user_id]
            ).then((rooms) => rooms.map(room => room.id))

            allRooms.forEach(room => {
                this.sock.join(room)
                if (online.has(room)) {
                    // messaging other user in room that
                    // new user is online
                    this.sock.broadcast
                        .to(room)
                        .emit(":user_online", {room_id: room})
                    // messasing this user that other user is online
                    this.sock.emit(":user_online", {room_id: room})
                    // setting people in room.id to 2
                    online.set(room, 2)
                } else {
                    // setting people in room.id to 1
                    // as there is no entry of that room
                    online.set(room, 1)
                }
            });
        } catch(err) {
            logger.error("ClientConnection.join_rooms:", err)
            this.sock.emit(":error", {error: "COULD_NOT_JOIN_ROOMS"})
        }
    }

    public disconnect() {
        this.sock.disconnect()
    }
}