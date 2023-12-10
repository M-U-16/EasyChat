import mysql2 from "mysql2"
import bcrypt from "bcrypt"

import connection, { queryDb } from "./db.js"

//validating that the user not already exists
export const checkUser = async(newUser) => {
    const sqlEmail = "SELECT email FROM users WHERE email=?"
    const sqlUsername = "SELECT username FROM users WHERE username=?"

    const username = [newUser.username] // username for query
    const email = [newUser.email] // email for query

    const resultEmail = await connection.promise().query(sqlEmail, email)
    const resultUsername = await connection.promise().query(sqlUsername, username)
    
    const result = {email: resultEmail[0], username: resultUsername[0]}
    if (
        result.email.length > 0 ||
        result.username.length > 0
    ) { 
        return {
            error: true,
            email: result.email.length > 0,
            username: result.username > 0
        }
    }
    return { error: false }
}
//function for adding user to database
export const addUser = async(user) => {
    try {
        const hashedPassword = await bcrypt.hash(user.password, 10)
        await queryDb(
            "INSERT INTO users (password, email, username, status) VALUES (?, ?, ?, ?)",
            [hashedPassword, user.email, user.username, true]
        )
        return true
    } catch(err) { return false }
}
//finds a user in database
export const findUser = async(email) => {
    try {
        const sql = "SELECT * FROM users WHERE email=?"
        return await connection.promise().query(sql, [email])
    } catch(err) { if (err) throw err }
}
//compares password from user and from database
export const comparePassHash = async(user_password, db_hash) => {

    const match = await bcrypt.compare(user_password, db_hash)
    if (!match) return false
    return true
}