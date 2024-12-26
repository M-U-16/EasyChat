import fs from "fs"
import sqlite3 from "sqlite3"
import { join } from "path"
import bcrypt from "bcrypt"
import child_process from "child_process"

import { logger } from "@/src/logger"
import { open_database } from "@/src/models/Db"

import { User } from "../controllers/Auth"
import path from "path"

export function get_db_path() {
    return join(process.env.DATA_DIR, process.env.DATABASE_NAME)
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
        username: "TestAccount2",
        password: await bcrypt.hash("TestAccount2", 10),
        email: "TestAccount2@email",
        dir: path.join(
            process.env.DATA_DIR,
            "users",
            "TestAccount2"
        )
    }

    const stm = db.prepare("INSERT INTO users(username, email, password, userDir) VALUES (?, ?, ?, ?)")
    stm.run(user1.username, user1.email, user1.password, user1.dir)
    stm.run(user2.username, user2.email, user2.password, user2.dir)
    stm.finalize()

    fs.mkdirSync(user1.dir, {recursive: true})
    fs.mkdirSync(user2.dir, {recursive: true})
    
    child_process.fork(
        "src/helpers/UserCreatePicture.js"
    ).send({
        username: user1.username,
        userDir: user1.dir
    })
    
    child_process.fork(
        "src/helpers/UserCreatePicture.js"
    ).send({
        username: user2.username,
        userDir: user2.dir
    })

    db.close()
}

export function check_env() {
    if (
        !process.env.DATA_DIR ||
        !process.env.DATABASE_NAME
    ) { 
        const error = new Error("needed environment variables not found")
        logger.error("check_env:", {error: error})
        throw error
    }
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