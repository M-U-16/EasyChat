import fs from "fs"
import { logger } from "#root/logger.js"
import { open_database } from "#root/src/models/db.js"
import { join } from "path"

export function get_db_path() {
    return join(process.env.DATA_DIR, process.env.DATABASE_NAME)
}

export function create_default(database_path) {
    if (fs.existsSync(database_path)) {
        return
    }

    let db = open_database(database_path, sqlite3.OPEN_CREATE | sqlite3.OPEN_READWRITE)
    create_tables(db)
    db.close()
}

export function check_env() {
    if (
        !process.env.DATA_DIR ||
        !process.env.DATABASE_NAME ||
        !process.env.SCHEMAS
    ) {
        logger.error(
            `DATA_DIR=${process.env.DATA_DIR}\n` +
            `DATA_DIR=${process.env.DATABASE_NAME}\n` +
            `DATA_DIR=${process.env.SCHEMAS}\n`
        )
        throw new Error("needed environment variables not found")
    }
}

async function create_tables(db) {
    const tables = path.join(
        process.env.SCHEMAS,
        "tables.sql"
    )

    let error = await new Promise(function(resolve, reject) {
        let schema = fs.readFileSync(tables).toString()
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