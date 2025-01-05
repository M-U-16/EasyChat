import fs from "fs"
import path from "path"
import sqlite3 from "sqlite3"
import child_process from "child_process"

import { v4 } from "uuid"
import { Request, Response } from "express"

import { logger } from "@/src/logger"
import { User } from "@/src/controllers/Auth"
import { DbAll, DbGet, DbRun } from "@/src/models/Db"

/*
{ username: 'TestAccount2', user_id: 2 },
{ username: 'mauri', user_id: 3 }
*/

const SQL_GET_ROOM_OF_TWO = `
SELECT room_id FROM participants
WHERE room_id IN (SELECT room_id FROM participants WHERE user_id=?)
AND user_id=?`

async function createGroup(name: string) {
    const group_profile = child_process.fork(
        "src/helpers/UserCreatePicture.js"
    )

    const group_path = path.join(
        process.env.DATA_DIR,
        "groups",
        name
    )
    fs.mkdirSync(group_path, {recursive: true})

    const profile_path = path.join(group_path, "profile.png")
    group_profile.send({
        path: profile_path,
        type: "group"
    })
}

export async function createChat(req: Request, res: Response): Promise<any> {
    if (!req.db) { throw Error("Request object has no database object") }
    
    const roomHash = v4()
    const user_id = req.user_id // info from jwt
    const username = req.username // info from jwt
    // get data from body
    const roomName = req.body.group_name
    const users: any[] = req.body.users
    const isContact = req.body.isContact

    logger.debug("createChat:", {users: users, isContact: isContact})

    //checks if information about users is there
    if (!users) {
        return res.json({
            error: true,
            message: "USERS_ARE_REQUIRED"
        })
    
    // check if users is empty
    } else if (users.length <= 0) {
        return res.json({
            error: true,
            message: "USERS_ARE_EMPTY"
        })
    }

    if (isContact && users.length > 1) {
        return res.json({
            error: true,
            message: "CONTACT_MORE_THAN_ONE_USER"
        })
    }

    
    if (isContact) {
        // check if room already exists
        try {
            const room = await DbGet(req.db, SQL_GET_ROOM_OF_TWO, [user_id, users[0].user_id])
            if (room instanceof Error) {
                throw room
            }

            logger.debug("createChat: check=", {room: room})
            if (room.room_id) {
                return res.json({
                    error: true,
                    message: "ROOM_ALREADY_EXISTS"
                })
            }
        } catch(err) {
            logger.debug("createChat:", {error: err})
        }
    } else {
        createGroup(roomHash)
    }

    users.push({user_id: user_id, username: username})
    
    try {
        let room = await new Promise<number>(function(resolve, reject) {
            req.db.serialize(async function() {
                
                //--------------------------creates a new chat room----------------
                try {
                    await DbRun(
                        req.db, "INSERT INTO rooms (room_hash, room_name, private, isContact) VALUES (?, ?, ?, ?)",
                        [roomHash, roomName, 1, isContact]
                    )
                    
                    //get the current auto_increment value of the room_id from rooms table
                    await DbGet(req.db, "SELECT room_id FROM rooms WHERE room_hash=?", [roomHash])
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
            //logger.debug("createChat:", {room: room, id: user.user_id})
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

    //check if rooom already exists
    /* const checkRoom = await DbGet(req.db, "SELECT * FROM rooms WHERE room_name=?", [roomHash])
    .then(result => result)
    if (checkRoom) return res.json({error: true, message: "ROOM_ALREADY_EXISTS"}) */

    return res.json({error: false, message: null})
}