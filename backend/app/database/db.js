import dbConf from "../config/db.conf.js"
import mysql2 from "mysql2"

const connection = mysql2.createConnection(dbConf)
connection.connect((err) => {
    if (err) throw err
    console.log("Connected to Database!")
})

export default connection