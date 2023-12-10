import { queryDb } from "../../models/db.js";


const addMessage = async(message) => {
    const message_query = `INSERT INTO messages (room_id, message, user_id, datetime_of_message) values (?, ?, ?, ?)`

    //----goes through the query values array and check if none is undefined
    let isUndefined = false
    for (const item in message.query_vars) {
        isUndefined = !message.query_vars[item]
        if (isUndefined) break
    }
    if (isUndefined) return //returns if undefined value is found
    
    await queryDb(message_query, message.query_vars) //adds new message to the database
}
export default addMessage