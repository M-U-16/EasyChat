import mysql2 from "mysql2"

const config = {
    host: "localhost",
    user: "root",
    password: process.env.DB_PASSWORD,
    database: "chatapp"
}

const connection = mysql2.createConnection(config)
connection.connect((err) => {
    if (err) throw err
    console.log("Connected to Database!")
})

export default connection