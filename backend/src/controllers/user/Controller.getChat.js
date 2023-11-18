import connection from "../../database/db.js"

const formatMessages = (messages) => {
    return messages.map(message => {
        return {
            message: message.content,
            creation_date: message.date,
            username: message.username
        }
    });
}

const getChat = async(req, res) => {
    const room = req.body.room_id
    const sql = "select * from messages where room_id=?"
    const result = connection
        .promise()
        .query(sql, [room])
        .then(result => result[0])
    console.log(result)

    return res.json({ messages: formatMessages(result) })
}
export default getChat