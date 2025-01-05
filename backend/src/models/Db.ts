import sqlite3 from "sqlite3"
import { logger } from "@/src/logger.js"

export function open_database(database_path: string, mode: number): sqlite3.Database {
    return new sqlite3.Database(
        database_path, mode,
        (err: Error) => {
            if (err) {
                logger.error("open_database:", {error: err})
                return
            }

            logger.info("Connected to Sqlite Database")
        }
    )
}

export function DbGet(
    db:sqlite3.Database,
    query: string,
    query_var: any[] = [],
):Promise<any|Error> {
    return new Promise((resolve, reject) => {
        db.get(query, query_var, (err: Error|null, row: any)=>{
            if (err) return reject(err)
            return resolve(row)
        })
    })
}

export function DbRun(
    db:sqlite3.Database,
    query: string,
    query_var: any[] = [],
): Promise<sqlite3.RunResult|Error> {
    return new Promise((resolve, reject) => {
        db.run(query, query_var, (err: Error|null)=>{
            if (err) return reject(err)
            resolve(this)
        })
    })
}

export function DbAll(
    db: sqlite3.Database,
    query: string, query_var: any[] = []
): Promise<any[]|Error> {
    return new Promise<any[]|Error>((resolve, reject) => {
        db.all(query, query_var, (err: Error|null, rows: any[])=>{
            if (err) return reject(err)
            resolve(rows)
        })
    })
}

export async function getUsername(db: sqlite3.Database, user_id: number): Promise<string> {
    return await DbGet(db,
        "select username from users where user_id=?",
        [user_id]
    ).then(result => result.username)
}