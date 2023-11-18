import connection from "../../database/db.js"
import { format } from "mysql2"

const getUsersInRoom = async(rooms, user_id) => {
    
    if (rooms.length < 1) return false

    const roomString = rooms
        .map(room => room.room_id.toString())
        .join(",")

    const query = `select user_id, room_id from participants where room_id in (${roomString}) and user_id <> ?`

    const res = await connection
        .promise()
        .query(query, [user_id])
        .then(result => result[0].map(user => {
            return {user_id: user.user_id, room_id: user.room_id}
        }))

    return res
}

const getContactInformation = async(users) => {
    const userString = users
        .map(user => user.user_id.toString())
        .join(",")

    const sql = `select username from users where user_id in (${userString})`
    return await connection
        .promise()
        .query(sql)
        .then(results => {
            return results[0].map((result, index) => {

                return {
                    username: result.username,
                    room_id: users[index].room_id
                }
            })
        })
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
            status: false,
            room_id: user.room_id,
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