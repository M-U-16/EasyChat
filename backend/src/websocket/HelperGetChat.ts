import sqlite3 from "sqlite3"
import { DbAll, DbGet, getUsername } from "@/src/models/Db"

interface Message {
    you: boolean;
    user_id: number;
    content: string;
    username: string;
    creation_date: string;
}

async function formatMessages(
    db: sqlite3.Database,
    messages: Message[],
    user_id=null
): Promise<Message[]> {
    return Promise.all(
        messages.map(async(message) => {
            return {
                content: message.content,
                creation_date: message.creation_date,
                username: await getUsername(db, message.user_id),
                you: message.user_id == user_id ? true : false,
                user_id: message.user_id
            }
        })
    )
}

async function getChat(db: sqlite3.Database, room_id: number, user_id: number): Promise<Message[]|Error> {
    if (!user_id || !room_id) return new Error("INVALID ARGUMENT")

    const result = await DbAll(db,
        "SELECT * FROM messages WHERE room_id=?", [room_id]
    ) as Message[]

    return formatMessages(db, result, user_id)
}
export default getChat