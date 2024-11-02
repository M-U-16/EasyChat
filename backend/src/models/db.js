/* import mysql2 from "mysql2" */
import sqlite3 from "sqlite3"
import config from "../../config/db.config.js"

/* const connection = mysql2.createConnection(config)
connection.connect((err) => {
    if (err) throw err
    console.log("Connected to Database!")
}) */
const connection = new sqlite3.Database(
    process.env.DATABASE_PATH,
    sqlite3.OPEN_READWRITE,
    (err) => {
        if (err) {
            throw err
        }
        console.log("Connected to Database!")
    }
)

export function queryDb(
    query_string,
    query_var=[],
) {
    return new Promise((resolve, reject) => {
        /* connection.query(query_string, query_var, (err, result) => {
            if (err) return reject(err)
            resolve(result)
        }) */
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

/* export default connection */
export default connection