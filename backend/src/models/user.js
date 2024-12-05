import bcrypt from "bcrypt"
import { queryDb } from "#root/src/models/db.js"
import { connection as db } from "#root/src/models/connections.js"

//validating that the user not already exists
export async function checkUser(newUser) {
    const sql = "SELECT 'username' as type, count(*) as count " +
    "FROM users " +
    "WHERE username = ? " +
    "UNION ALL " +
    "SELECT 'email' as type, count(*) as count " +
    "FROM users " +
    "WHERE email = ?"

    const rows = await queryDb(db, sql, [newUser.username, newUser.email])
    let result = (function() {
        let values = {
            "username": 0,
            "email": 0
        }
        rows.forEach(element => {
            values[element.type] = element.count
        });

        return values
    })()
    
    return {
        error: result.email != 0 || result.username != 0,
        emailError: result.email != 0,
        usernameError: result.username != 0
    }
}

//function for adding user to database
export async function addUser(user) {
    try {
        const hashedPassword = await bcrypt.hash(user.password, 10)
        await queryDb(
            db,
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
        const user = await queryDb(db, sql, [email])
        return user[0]
    } catch(err) { if (err) throw err }
}

//compares password from user and from database
export async function comparePassHash(user_password, db_hash) {
    const match = await bcrypt.compare(user_password, db_hash)
    if (!match) return false
    return true
}