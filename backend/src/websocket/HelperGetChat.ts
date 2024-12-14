import sqlite3 from "sqlite3"
import { DbAll, DbGet, getUsername } from "@/src/models/Db"
import { logger } from "../logger";

interface Message {
    you: boolean;
    user_id: number;
    message: string;
    username: string;
    created_at: string;
}

async function getChat(
    db: sqlite3.Database,
    room_id: number,
    user_id: number
): Promise<Message[]|Error> {
    if (!user_id || !room_id) return new Error("INVALID ARGUMENT")
    logger.debug("getChat room_id:", {room_id: room_id})
    const messages = await DbAll(db,
        "SELECT * FROM messages WHERE room_id=?", [room_id]
    ) as Message[]

    return Promise.all(
        messages.map(async(message) => {
            return {
                message: message.message,
                created_at: message.created_at,
                username: await getUsername(db, message.user_id),
                you: message.user_id == user_id ? true : false,
                user_id: message.user_id
            }
        })
    )
}

export default getChat