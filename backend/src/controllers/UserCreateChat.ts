import { logger } from "@/src/logger"
import { DbGet, DbRun } from "@/src/models/Db"
import { connection as db } from "@/src/models/Connections"
import { Request, Response } from "express"
const isPrivate = true

export async function createChat(req: Request, res: Response): Promise<any> {
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
        db, "select user_id, username from users where username=?",
        [contactName]
    )

    if (!contactInfo) return res.json({
        error: true,
        message: "CONTACT_NOT_FOUND"
    })
    
    //check if rooom already exists
    const checkRoom = await DbGet(db, "select * from rooms where room_name=?", [roomName])
        .then(result => result.length === 0 ? false : true)
    if (checkRoom) return res.json({error: true, message: "ROOM_ALREADY_EXISTS"})
        
    try {
        let room = new Promise<number>(function(resolve, reject) {
            db.serialize(async function() {
                
                //--------------------------creates a new chat room----------------
                try {
                    await DbRun(
                        db, "INSERT INTO rooms (room_name, private) VALUES (?, ?)",
                        [roomName, isPrivate]
                    )
                    
                    //get the current auto_increment value of the room_id from rooms table
                    await DbGet(db, "SELECT room_id FROM rooms WHERE room_name=?", [roomName])
                    .then(row => resolve(row.room_id))
                } catch(err) {
                    return reject(err)
                }  
            })
        })

        const stmt = db.prepare(
            "INSERT INTO participants (room_id, user_id) VALUES (?, ?)",
            (err: Error|null) => {
                if (err) {
                    logger.error("createChat:", err)
                    throw err
                }
            }
        )

        let participantList = [user_id, contactInfo.user_id]
        participantList.forEach((participant) => {
            stmt.run(room, participant)
        })

        stmt.finalize()
    } catch(err) {
        logger.error(err)
        return res.json({
            error: true,
            message: "COULD_NOT_ADD_USER"
        })
    }

    return res.json({error: false, message: null})
}