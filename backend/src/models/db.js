import sqlite3 from "sqlite3"
import { logger } from "#root/logger.js"

export function open_database(database_path, mode) {
    return new sqlite3.Database(
        database_path, mode,
        (err) => {
            if (err)  {
                return console.error(err.message)
            }
            logger.info("Connected to Sqlite Database.")
        }
    )
}

export function queryDb(
    db,
    query_string,
    query_var=[],
) {
    return new Promise((resolve, reject) => {
        db.all(query_string, query_var, (err, result)=>{
            if (err) return reject(err)
            resolve(result)
        })
    })
}

export async function getUsername(db, user_id) {
    const sql = "select username from users where user_id=?"
    return await queryDb(db, sql, [user_id])
        .then(result => result[0].username)
}