import mysql2 from "mysql2"
import config from "../../config/db.config.js"

const connection = mysql2.createConnection(config)
connection.connect((err) => {
    if (err) throw err
    console.log("Connected to Database!")
})
export const queryDb = (
    query_string,
    query_var=[],
) => {
    return new Promise((resolve, reject) => {
        connection.query(query_string, query_var, (err, result) => {
            if (err) return reject(err)
            resolve(result)
        })
    })
}
export const getUsername = async(user_id) => {
    const sql = "select username from users where user_id=?"
    return await queryDb(sql, [user_id])
        .then(result => result[0].username)
}

export default connection