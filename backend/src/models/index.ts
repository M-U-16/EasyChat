import fs from "fs"
import path from "path"
import { v4 } from "uuid"
import sqlite3 from "sqlite3"
import { join } from "path"
import bcrypt from "bcrypt"
import child_process from "child_process"
import { logger } from "@/src/logger"
import { DbGet, DbRun, open_database } from "@/src/models/Db"
import { User } from "@/src/controllers/Auth"
import { createGroup } from "@/src/controllers/UserCreateChat"

export function get_db_path() {
    return join(process.env.DATA_DIR, process.env.DATABASE_NAME)
}

async function create_default_chat(db: sqlite3.Database, users: any[], isContact:boolean, roomHash: string, roomName:string) {
    try {
        let room = await new Promise<number>(function(resolve, reject) {
            db.serialize(async function() {
                        
                try {
                    await DbRun(
                        db, "INSERT INTO rooms (room_hash, room_name, private, isContact) VALUES (?, ?, ?, ?)",
                        [roomHash, "BeispielGruppe", 1, isContact]
                    )
                            
                    //get the current auto_increment value of the room_id from rooms table
                    await DbGet(db, "SELECT room_id FROM rooms WHERE room_hash=?", [roomHash])
                    .then(row => {
                        logger.debug("createChat:", {row: row})
                        resolve(row.room_id)
                    })
                } catch(err) {
                    return reject(err)
                }
            })
        })
        
        const stmt = db.prepare(
            "INSERT INTO participants (room_id, user_id) VALUES (?, ?)",
            (err: Error|null) => {
                if (err) {
                    logger.error("createChat:", {err: err})
                    throw err
                }
            }
        )
        
        users.forEach(user => {
            stmt.run(room, user.user_id)
        })
        
        stmt.finalize()
    } catch(err) {
        logger.error("create_default:", {error: err})
    }
}

export async function create_default(database_path: string) {
    if (fs.existsSync(database_path)) {
        return
    }

    let db = open_database(database_path, sqlite3.OPEN_CREATE | sqlite3.OPEN_READWRITE)
    if (!db) {
        const error = new Error("could not open database")
        logger.error("create_default:", {error: error})
        throw error
    }

    await create_tables(db)

    const user1: User = {
        user_id: 1,
        username: "TestAccount1",
        password: await bcrypt.hash("TestAccount1", 10),
        email: "TestAccount1@email",
        dir: path.join(
            process.env.DATA_DIR,
            "users",
            "TestAccount1"
        )
    }
    
    const user2: User = {
        user_id: 2,
        username: "TestAccount2",
        password: await bcrypt.hash("TestAccount2", 10),
        email: "TestAccount2@email",
        dir: path.join(
            process.env.DATA_DIR,
            "users",
            "TestAccount2"
        )
    }
    
    const user3: User = {
        user_id: 3,
        username: "TestAccount3",
        password: await bcrypt.hash("TestAccount3", 10),
        email: "TestAccount3@email",
        dir: path.join(
            process.env.DATA_DIR,
            "users",
            "TestAccount3"
        )
    }

    const stm = db.prepare("INSERT INTO users(user_id, username, email, password, userDir) VALUES (?, ?, ?, ?, ?)")
    stm.run(user1.user_id, user1.username, user1.email, user1.password, user1.dir)
    stm.run(user2.user_id, user2.username, user2.email, user2.password, user2.dir)
    stm.run(user3.user_id, user3.username, user3.email, user3.password, user3.dir)
    stm.finalize()

    fs.mkdirSync(user1.dir, {recursive: true})
    fs.mkdirSync(user2.dir, {recursive: true})
    fs.mkdirSync(user3.dir, {recursive: true})
    
    child_process.fork(
        "src/helpers/UserCreatePicture.js"
    ).send({
        username: user1.username,
        path: user1.dir
    })
    
    child_process.fork(
        "src/helpers/UserCreatePicture.js"
    ).send({
        username: user2.username,
        path: user2.dir
    })
    
    child_process.fork(
        "src/helpers/UserCreatePicture.js"
    ).send({
        username: user3.username,
        path: user3.dir
    })

    const groupHash = v4()
    createGroup(groupHash)
    await create_default_chat(db, [user1, user2, user3], false, groupHash, "BeispielGruppe")
    await create_default_chat(db, [user1, user2], true, v4(), "")
    
    db.close()
}

async function create_tables(db: sqlite3.Database) {
    let error = await new Promise(function(resolve, reject) {
        let schema = fs.readFileSync("schemas/tables.sql").toString()
        db.exec(schema,
            (err) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(null)
                }
            }
        )
    })
    
    if (error) {
        logger.error(error)
        process.exit(1)
    } else {
        logger.info("Created tables for Database.")
    }
}