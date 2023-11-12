import connection from "../../database/db.js"
import { getQueryResults } from "../../database/db-actions/dbQueryResult.js"

const createChat = async(req, res) => {

    console.log("hello")

    const isPrivate = true
    const user_id = req.user_id
    const contactName = req.body.contactName

    if (!contactName || !user_id) return res.json({error: true, message: "CONTACT_IS_REQUIRED"})

    //get the id from new contact username
    const contactId = await connection
        .promise()
        .query("select user_id from users where username=?", [contactName])
        .then(result => getQueryResults(result))
    
    if (!contactId) return res.json({error: true, message: "CONTACT_NOT_FOUND"})
    
    //check if rooom already exists
    const checkRoom = await connection
        .promise()
        .query("select * from rooms where room_name=?", [contactName])
        .then(result => result[0])
        .then(result => {
            if (result.length < 1) return false
            return true
        })

    //creates a new chat room
    const chatQuery = "insert into rooms (room_name, private) values (?, ?)"
    if (!checkRoom) {
        const newChat = await connection
            .promise()
            .query(chatQuery, [contactName, isPrivate])
        //get the current auto_increment value from rooms table
        if (newChat) {
            const roomId = await connection
                .promise()
                .query("SELECT last_insert_id()")
                .then(result => result[0][0]["last_insert_id()"])
            if (roomId) {
                const participantList = [user_id, contactId.user_id]
                const participantSql = "insert into participants (room_id, user_id) values (?, ?)"

                participantList.forEach((participant) => {
                    connection.query(participantSql, [roomId, participant], (err, result)=>{
                        if (err) throw err
                    })
                })
            }
            return res.json({error: false, message: null})
        } else {
            return res.json({error: true, message: "error"})
        }
    } else {
        return res.json({error: true, message: "ROOM_ALREADY_EXISTS"})
    }
}
export default createChat