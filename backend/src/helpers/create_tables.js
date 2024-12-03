import fs from "fs"
import "dotenv/config"
import path from "path"
import sqlite3 from "sqlite3"
import { logger } from "#root/logger.js"

const tables = path.join(
    process.env.SQL_PATH,
    "tables.sql"
)

const db = new sqlite3.Database(
    process.env.DATABASE_PATH,
    sqlite3.OPEN_READWRITE,
    (err) => {
        if (err)  {
            return console.error(err.message)
        }
        logger.info("Connected to Sqlite Database.")
    }
)
db.exec(fs.readFileSync(tables).toString(),
    (err)=>{
        if (err) {
            logger.error(err)
        } else {
            logger.info("Created tables for Database.")
        }
    }
)
db.close()