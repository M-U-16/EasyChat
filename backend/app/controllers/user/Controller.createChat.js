import connection from "../../database/db.js"
import { encryptToken } from "../../helpers/JWT.js"
import { getTokenName } from "../../helpers/env.js"
import { format } from "mysql2"
import { getQueryResults } from "../../database/db-actions/dbQueryResult.js"

const createChat = async(req, res) => {

    const token = req.cookies[getTokenName()]
    const isPrivate = true
    const user = encryptToken(token)
    const user_id = user.user_id
    const contactName = req.body.contactName

    if (!contactName || !user_id) res.json({error: true, message: "CONTACT_OR_USER_NOT_THERE"})

    //get the id from new contact username
    const contactId = await connection
        .promise()
        .query("select user_id from users where username=?", [contactName])
        .then(result => getQueryResults(result).user_id)
    
    //check if rooom already exists
    const checkRoom = await connection
        .promise()
        .query("select * from rooms where room_name=?", [contactName])
        .then(result => result[0].length)
        .then(result => {
            if (result < 1) return true
            return false
        })

    //insert participants
    const insertParticipants = async(sql, data) => {
        for (let i=0; i<data.length; i++) {
            await client.insert(sql, data[i]);
        }
    }

    //creates a new room
    const chatQuery = "insert into rooms (room_name, private) values (?, ?)"
    if (checkRoom) {
        const newChat = await connection
            .promise()
            .query(chatQuery, [contactName, isPrivate])
        //get the current auto_increment value from rooms table
        if (newChat) {
            const roomId = await connection
                .promise()
                .query("SELECT last_insert_id()")
                .then(result => getQueryResults(result)["last_insert_id()"])
            if (roomId) {
                res.json("hello from new chat")
                const participantList = [user_id, contactId]
                const participantSql = "insert into participants (room_id, user_id) values (?, ?)"
            
                connection.query("select last_insert_id()")

                participantList.forEach((participant) => {
                    connection.query(participantSql, [roomId, participant], (err, result)=>{
                        if (err) throw err
                    })
                })
            } else {
                res.json({error: true, message: "error"})
            }
        } else {
            res.json({error: true, message: "error"})
        }
    } else {
        res.json({error: true, message: "error"})
    }
}
export default createChat