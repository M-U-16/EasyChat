import connection from "../../database/db.js"
import { format } from "mysql2"

const getUsersInRoom = async(rooms, user_id) => {
    
    if (rooms.length < 1) return false

    const roomString = rooms
        .map(room => room.room_id.toString())
        .join(",")

    const query = `select user_id from participants where room_id in (${roomString}) and user_id <> ?`

    return await connection
        .promise()
        .query(query, [user_id])
        .then(result => result[0].map(user => user.user_id))
    
}

const getContactInformation = async(users) => {
    const userString = users
        .map(user => user.toString())
        .join(",")

    const sql = `select username from users where user_id in (${userString})`
    return await connection
        .promise()
        .query(sql)
        .then(result => result[0])
}

const createContactObject = (userInf) => {

    return userInf.map(user => {
        return {
            username: user.username,
            lastMessage: {
                username: "You",
                message: "helisfj kfjidjfkd?"
            },
            newMessages: 0,
            status: false
        }
    })
}

const getContacts = async(req, res) => {

    const userId = req.user_id
    const sql = format("select room_id from participants where user_id=?", [userId])
    
    const rooms = await connection
        .promise()
        .query(sql)
        .then(result => result[0])

    const users = await getUsersInRoom(rooms, userId)
    if (users) {
        const userInfo = await getContactInformation(users)
        const obj = createContactObject(userInfo)
        return res.json({contacts: obj})
    }
    return res.json({error: true, message: "NO_CONTACTS_FOR_THIS_USER"})
}
export default getContacts