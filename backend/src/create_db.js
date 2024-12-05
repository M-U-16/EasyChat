import fs from "fs"
import path from "path"
import "dotenv/config"
import sqlite3 from "sqlite3"

if (
    !process.env.DATA_DIR ||
    !process.env.DATABASE_NAME ||
    !process.env.SCHEMAS
) {
    console.log(
        `DATA_DIR=${process.env.DATA_DIR}\n` +
        `DATA_DIR=${process.env.DATABASE_NAME}\n` +
        `DATA_DIR=${process.env.SCHEMAS}\n`
    )
    process.exit(1)
}

let database_path = path.join(
    process.env.DATA_DIR,
    process.env.DATABASE_NAME
)

if (fs.existsSync(database_path)) {
    process.exit(0)
}

const tables = path.join(
    process.env.SCHEMAS,
    "tables.sql"
)

console.log(database_path)
const db = new sqlite3.Database(
    database_path,
    (err) => {
        if (err)  {
            return console.error(err.message)
        }
        console.info("Connected to Sqlite Database.")
    }
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

db.close()

if (error) {
    console.error(error)
    process.exit(1)
} else {
    console.info("Created tables for Database.")
    process.exit(0)
}