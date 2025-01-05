import sqlite3 from "sqlite3"
import { DbGet } from "@/src/models/Db"

export interface LastMessage {
    username: string;
    you: boolean;
    message: string;
    created_at: string;
}

const SQL_GET_LAST_MESSAGE = `SELECT users.username, users.user_id, messages.message, messages.created_at FROM messages INNER JOIN
users ON users.user_id = messages.user_id WHERE messages.room_id=? ORDER BY messages.message_id DESC LIMIT 1`

export async function getLastMessage(db: sqlite3.Database, room_id: number, user_id: number): Promise<LastMessage> {
    //get the last message in the given room
    const lastMessage = await DbGet(db, SQL_GET_LAST_MESSAGE, [room_id])

    // check if there are any messages
    if (!lastMessage) {
        return {
            username: "", created_at:"",
            you: false, message: ""
        }
    }

    lastMessage.you = lastMessage.user_id == user_id ? true : false
    //console.debug("getLastMessage:", "room_id=", room_id, "\nLastMessage:", lastMessage)
    return lastMessage
}