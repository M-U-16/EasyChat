import fs from "fs"
import "dotenv/config"
import path from "path"
import sqlite3 from "sqlite3"

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
        console.log("Connected to Sqlite Database.")
    }
)
db.exec(fs.readFileSync(tables).toString(),
    (err)=>{
        if (err) {
            console.log(err)
        } else {
            console.log("Created tables for Database.")
        }
    }
)
db.close()