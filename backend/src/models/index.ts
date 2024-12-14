import fs from "fs"
import sqlite3 from "sqlite3"
import { join } from "path"

import { logger } from "@/src/logger"
import { open_database } from "@/src/models/Db"

export function get_db_path() {
    return join(process.env.DATA_DIR, process.env.DATABASE_NAME)
}

export function create_default(database_path: string) {
    if (fs.existsSync(database_path)) {
        return
    }

    let db = open_database(database_path, sqlite3.OPEN_CREATE | sqlite3.OPEN_READWRITE)
    if (!db) {
        const error = new Error("could not open database")
        logger.error("create_default:", {error: error})
        throw error
    }
    create_tables(db)
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