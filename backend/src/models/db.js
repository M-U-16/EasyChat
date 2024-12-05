import sqlite3 from "sqlite3"
import { logger } from "#root/logger.js"
import path from "path"
import fs from "fs"

let database_path = path.join(process.env.DATA_DIR, process.env.DATABASE_NAME)
if (!fs.existsSync(database_path)) {
    logger.error(`Database '${database_path}' does not exist...`)
    process.exit(1)
}

const connection = new sqlite3.Database(
    database_path,
    sqlite3.OPEN_READWRITE,
    (err) => {
        if (err) {
            throw err
        }
        logger.info("Connected to Database!")
    }
)

export function queryDb(
    query_string,
    query_var=[],
) {
    return new Promise((resolve, reject) => {
        connection.all(query_string, query_var, (err, result)=>{
            if (err) return reject(err)
            resolve(result)
        })
    })
}

export async function getUsername(user_id) {
    const sql = "select username from users where user_id=?"
    return await queryDb(sql, [user_id])
        .then(result => result[0].username)
}

export default connection