import connection from "../database/db.js"
import mysql2 from "mysql2"

import bcrypt from "bcrypt"
import { createTokens } from "../helpers/JWT.js"

//validating that the user not already exists
const checkUser = async (newUser) => {
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
const addUser = async (user) => {
    try {
        
        const hashedPassword = await bcrypt.hash(user.password, 10)
        const sql = mysql2.format(
            "INSERT INTO users (password, email, username) VALUES (?, ?, ?)",
            [hashedPassword, user.email, user.username]   
        )
        const result = await connection.promise().query(sql)
        return true

    } catch(err) { return false }
}

const findUser = async (email) => {

    try {
        const sql = "SELECT * FROM users WHERE email=?"
        return await connection.promise().query(sql, [email])
    } catch(err) { if (err) throw err }
}

const comparePassHash = async (user_password, db_hash) => {

    const match = await bcrypt.compare(user_password, db_hash)
    if (match) return true
    if (!match) return false
}

export {
    checkUser,
    addUser,
    findUser,
    comparePassHash
}