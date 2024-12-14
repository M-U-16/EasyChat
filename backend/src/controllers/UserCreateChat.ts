import { logger } from "@/src/logger"
import { DbGet, DbRun } from "@/src/models/Db"
import { Request, Response } from "express"
const isPrivate = true

export async function createChat(req: Request, res: Response): Promise<any> {
    if (!req.db) { throw Error("Request object has no database object") }
    
    const user_id = req.user_id
    const username = req.username
    const contactName = req.body.contactName
    const roomName = contactName + "-" + username

    //checks if user information is there
    if (!contactName || !user_id) return res.json({
        error: true,
        message: "CONTACT_IS_REQUIRED"
    })

    //get the id from new contact username
    const contactInfo = await DbGet(
        req.db, "select user_id, username from users where username=?",
        [contactName]
    )

    if (!contactInfo) return res.json({
        error: true,
        message: "CONTACT_NOT_FOUND"
    })

    //check if rooom already exists
    const checkRoom = await DbGet(req.db, "select * from rooms where room_name=?", [roomName])
        .then(result => result)
    if (checkRoom) return res.json({error: true, message: "ROOM_ALREADY_EXISTS"})

    try {
        let room = await new Promise<number>(function(resolve, reject) {
            req.db.serialize(async function() {
                
                //--------------------------creates a new chat room----------------
                try {
                    await DbRun(
                        req.db, "INSERT INTO rooms (room_name, private) VALUES (?, ?)",
                        [roomName, isPrivate]
                    )
                    
                    //get the current auto_increment value of the room_id from rooms table
                    await DbGet(req.db, "SELECT room_id FROM rooms WHERE room_name=?", [roomName])
                    .then(row => {
                        logger.debug("createChat:", row)
                        logger.log()
                        resolve(row.room_id)
                    })
                } catch(err) {
                    return reject(err)
                }  
            })
        })
        logger.debug("createChat: ", "'", room, "'")

        const stmt = req.db.prepare(
            "INSERT INTO participants (room_id, user_id) VALUES (?, ?)",
            (err: Error|null) => {
                if (err) {
                    logger.error("createChat:", {err: err})
                    throw err
                }
            }
        )

        /* console.log(user_id, contactInfo.user_id)
        let participantList = [user_id, contactInfo.user_id]
        logger.debug("createChat:", participantList)
        participantList.forEach((participant) => {
            stmt.run(room, participant)
        }) */
        stmt.run(room, user_id)
        stmt.run(room, contactInfo.user_id)

        stmt.finalize()
    } catch(err) {
        
        logger.error("createChat:", {error: err})
        return res.json({
            error: true,
            message: "COULD_NOT_ADD_USER"
        })
    }

    return res.json({error: false, message: null})
}