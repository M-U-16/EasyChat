import { queryDb } from "../models/db.js";
import { connection as db } from "#root/src/models/connections.js";

async function addMessage(
    room, message,
    user_id, date
) {
    if (!room || !message || !user_id || !date) {
        return new Error("addMessage: error in arguments")
    }
    
    await queryDb(
        db,
        "INSERT INTO messages"+
        "(room_id, message, user_id, created_at)"+
        "values (?, ?, ?, ?)",
        [room, message, user_id, date]
    ) //adds new message to the database
}

export default addMessage