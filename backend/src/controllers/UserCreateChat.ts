import { v4 } from "uuid"
import { logger } from "@/src/logger"
import { DbAll, DbGet, DbRun } from "@/src/models/Db"
import { Request, Response } from "express"
const isPrivate = true

export async function createChat(req: Request, res: Response): Promise<any> {
    if (!req.db) { throw Error("Request object has no database object") }
    
    const user_id = req.user_id
    const username = req.username
    const users: any[] = req.body.users
    users.push({user_id: user_id, username: username})

    logger.debug("createChat:", {users: users})

    //checks if user information is there
    if (!users) {
        return res.json({
            error: true,
            message: "USERS_ARE_REQUIRED"
        })
    } else if (users.length == 1) {
        return res.json({
            error: true,
            message: "USERS_ARE_EMPTY"
        })
    }

    const roomName = v4()

    //check if rooom already exists
    const checkRoom = await DbGet(req.db, "SELECT * FROM rooms WHERE room_name=?", [roomName])
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
                        logger.debug("createChat:", {row: row})
                        resolve(row.room_id)
                    })
                } catch(err) {
                    return reject(err)
                }
            })
        })
        logger.debug("createChat: ", {room: room})

        const stmt = req.db.prepare(
            "INSERT INTO participants (room_id, user_id) VALUES (?, ?)",
            (err: Error|null) => {
                if (err) {
                    logger.error("createChat:", {err: err})
                    throw err
                }
            }
        )

        users.forEach((user)=>{
            logger.debug("createChat:", {room: room, id: user.user_id})
            stmt.run(room, user.user_id)
        })

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