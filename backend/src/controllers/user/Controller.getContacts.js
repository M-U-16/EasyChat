import { queryDb, getUsername } from "../../models/db.js"


const getLastMessage = async(room_id, user_id) => {
    //get the last message in the given room
    const lastMessage = await queryDb(
        `
            select user_id, message from messages
            where room_id=? and message_id=(select max(message_id)
            from messages where room_id=?)
        `,
        [room_id, room_id]
    ).then(result => result[0])
    //gets the username for that user
    lastMessage.username = await getUsername(lastMessage.user_id)
    lastMessage.you = lastMessage.user_id == user_id ? true:false
    return lastMessage
}

const getUsersInRoom = async(rooms, user_id) => {
    
    if (rooms.length < 1) return false

    const roomString = rooms
        .map(room => room.room_id.toString())
        .join(",")
    const sql = `select user_id, room_id from participants where room_id in (${roomString}) and user_id <> ?`

    return await queryDb(sql, [user_id])
        .then(result => result.map(user => {
            return {user_id: user.user_id, room_id: user.room_id}
        }))
}

const getContactInformation = async(users) => {
    const userString = users
        .map(user => user.user_id.toString())
        .join(",")

    const sql = `select username from users where user_id in (${userString})`

    return await queryDb(sql)
        .then(results => {
            return results.map((result, index) => {

                return {
                    username: result.username,
                    room_id: users[index].room_id
                }
            })
        })
}

const createContactObject = async(userInf, user_id) => {

    const obj = userInf.map(async(user) => {
        return {
            username: user.username,
            lastMessage: await getLastMessage(user.room_id, user_id),
            newMessages: 0,
            status: false,
            room_id: user.room_id,
        }
    })
    return await Promise.all(obj)
}

const getContacts = async(req, res) => {

    const userId = req.user_id
    const sql = "select room_id from participants where user_id=?"
    
    const rooms = await queryDb(sql, [userId])
    const users = await getUsersInRoom(rooms, userId)

    if (users) {
        const userInfo = await getContactInformation(users)
        const obj = await createContactObject(userInfo, userId)
        return res.json({contacts: obj})
    }
    return res.json({error: true, message: "NO_CONTACTS_FOR_THIS_USER"})
}
export default getContacts