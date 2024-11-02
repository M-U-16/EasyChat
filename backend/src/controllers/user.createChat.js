import { queryDb } from "../models/db.js"

const isPrivate = true

export async function createChat(req, res) {
    const user_id = req.user_id
    const username = req.username
    const contactName = req.body.contactName
    const roomName = contactName + "-" + username

    //checks if user information is there
    if (!contactName || !user_id) return res.json({error: true, message: "CONTACT_IS_REQUIRED"})

    //get the id from new contact username
    const contactInfo = await queryDb("select user_id, username from users where username=?", [contactName])
        .then(result => result[0])
    if (!contactInfo) return res.json({error: true, message: "CONTACT_NOT_FOUND"})
    
    //check if rooom already exists
    const checkRoom = await queryDb("select * from rooms where room_name=?", [roomName])
        .then(result => result.length === 0 ? false : true)
    if (checkRoom) return res.json({error: true, message: "ROOM_ALREADY_EXISTS"})

    //--------------------------creates a new chat room----------------
    const chatQuery = "insert into rooms (room_name, private) values (?, ?)"
    await queryDb(chatQuery, [roomName, isPrivate])

    //get the current auto_increment value of the room_id from rooms table
    const roomId = await queryDb("SELECT room_id from rooms where room_name=?", [roomName])
        .then(result => result[0].room_id)

    const participantList = [user_id, contactInfo.user_id]
    const participantSql = "insert into participants (room_id, user_id) values (?, ?)"

    try {
        participantList.forEach((participant) => {
            queryDb(participantSql, [roomId, participant])
        })
    } catch(err) {
        console.log(err)
        return res.json({
            error: true,
            message: "COULD_NOT_ADD_USER"
        })
    }

    return res.json({error: false, message: null})
}