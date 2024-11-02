import bcrypt from "bcrypt"
import connection, { queryDb } from "./db.js"

function formatResponse(res, value) {
    if (!res[0]) return
    return res[0][value]
}

//validating that the user not already exists
export async function checkUser(newUser) {
    /* return {error: false} */

    const sqlEmail = "SELECT email FROM users WHERE email=?"
    const sqlUsername = "SELECT username FROM users WHERE username=?"
    
    const email = formatResponse(
        await queryDb(sqlEmail, [newUser.email]),
        "email"
    )
    const username = formatResponse(
        await queryDb(sqlUsername, [newUser.username]),
        "username"
    )

    if (email || username) {
        return {
            error: true,
            emailError: email != undefined,
            usernameError: username != undefined
        }
    }

    return { error: false }
}

//function for adding user to database
export async function addUser(user) {
    try {
        const hashedPassword = await bcrypt.hash(user.password, 10)
        await queryDb(
            "INSERT INTO users (password, email, username, userDir) VALUES (?, ?, ?, ?)",
            [hashedPassword, user.email, user.username, user.dir]
        )
        return true
    } catch(err) { return false }
}

//finds a user in database
export async function findUser(email) {
    try {
        const sql = "SELECT * FROM users WHERE email=?"
        const user = await queryDb(sql, [email])
        return user[0]
    } catch(err) { if (err) throw err }
}

//compares password from user and from database
export async function comparePassHash(user_password, db_hash) {
    const match = await bcrypt.compare(user_password, db_hash)
    if (!match) return false
    return true
}