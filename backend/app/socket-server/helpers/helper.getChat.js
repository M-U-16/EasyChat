import connection from "../../database/db.js"

const getUsername = async(user_id) => {
    const sql = "select username from users where user_id=?"
    const res = await connection
        .promise()
        .query(sql, [user_id])
        .then(result => result[0][0].username)

    return res
}

const formatMessages = async(messages, user_id=null) => {

    const obj = messages.map(async(message) => {
        const username = await getUsername(message.user_id)
        const messageObj = {
            message: message.message,
            creation_date: message.creation_date,
            username: username,
            you: message.user_id == user_id ? true : false
        }
        return messageObj
    });
    return await Promise.all(obj)
}

const getChat = async(room_id, user_id=null) => {
    const sql = "select * from messages where room_id=?"
    const result = await connection
        .promise()
        .query(sql, [room_id])
        .then(result => result[0])
    
    return { messages: await formatMessages(result, user_id) }
}
export default getChat