import getChat from "./helper.getChat.js"
import addMessage from "./helper.addMessage.js"
import joinRoom from "./helper.joinRoom.js"
import { v4 } from "uuid"
import { queryDb } from "../models/db.js"
import { logger } from "#root/logger.js"
import { connection as db } from "#root/src/models/connections.js"

const online = new Map()

export async function registerChatHandler(socket) {
    let allRooms
    let currentRoom = -1;
    
    if (typeof(socket.data.user_id) == 'number') {
        allRooms = await queryDb(
            db, 
            "select room_id as id from participants where user_id=?",
            [socket.data.user_id]
        )
        allRooms = allRooms.map(room => room.id)

        allRooms.forEach(room => {
            socket.join(room)
            if (online.has(room)) {
                // messaging other user in room that
                // new user is online
                socket.broadcast
                    .to(room)
                    .emit(":user_online", {room_id: room})
                // messasing this user that other user is online
                socket.emit(":user_online", {room_id: room})
                // setting people in room.id to 2
                online.set(room, 2)
            } else {
                // setting people in room.id to 1
                // as there is no entry of that room
                online.set(room, 1)
            }
        });
    }

    //handeling users joining to specific rooms
    socket.on(":get_chat", async(data, callback) => {
        if (typeof(data.room_id) != 'number' || typeof(socket.data.user_id) != 'number') {
            return
        }

        try {
            //returns the messages of the room stored in messages table
            callback(await getChat(data.room_id, socket.data.user_id))
        } catch(err) { logger.error(err) }
    })

    socket.on(":join_room", async(data, callback) => {
        
        if (typeof(data.room_id) != 'number' || typeof(socket.data.user_id) != 'number') {
            return
        }

        try {
            currentRoom = await joinRoom(
                socket,
                data.room_id,
                currentRoom,
                socket.data.user_id,
            )

            //returns the messages of the room stored in messages table
            callback(await getChat(data.room_id, socket.data.user_id))
        } catch(err) { logger.error(err) }
    })

    socket.on(":send_message", async(data, callback) => {

        try {
            addMessage(
                data.room_id,
                data.message,
                socket.data.user_id,
                data.date
            ) // store message in database

            const message = {
                message: data.message,
                room_id: data.room_id,
                creation_date: data.date,
                user_id: socket.data.user_id,
                username: socket.data.username,
                uuid: v4(),
            }

            //sending message event to all clients
            socket.broadcast.to(data.room_id).emit(":new_message", message)
            callback(message)

        } catch(err) { logger.error(err) }
    })

    socket.on("disconnect", () => {
        logger.info("user disconnected")
        allRooms.forEach(room => {
            if (online.get(room) == 1) {
                online.delete(room)
            } else {
                online.set(room, 1)
                socket.broadcast.to(room).emit(
                    ":user_offline",
                    {room_id: room}
                )
            }
        })
    })
}