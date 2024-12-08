import sqlite3 from "sqlite3"
import bcrypt from "bcrypt"
import { User } from "@/src/controllers/Auth"

import { DbGet, DbRun } from "@/src/models/Db"

//validating that the user not already exists
export async function checkUser(db: sqlite3.Database, newUser: User) {
    const sql = `SELECT 'username' as type, count(*) AS count
    FROM users WHERE username = ?
    UNION ALL
    SELECT 'email' as type, count(*) AS count
    FROM users
    WHERE email = ?
    `

    const rows = await DbGet(db, sql, [newUser.username, newUser.email])
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
export async function addUser(db: sqlite3.Database, user: User) {
    try {
        const hashedPassword = await bcrypt.hash(user.password, 10)
        await DbRun(db,
            "INSERT INTO users (password, email, username, userDir) VALUES (?, ?, ?, ?)",
            [hashedPassword, user.email, user.username, user.dir]
        )
        return true
    } catch(err) { return false }
}

//finds a user in database
export async function findUser(db: sqlite3.Database, email: string): Promise<any> {
    try {
        return DbGet(db, "SELECT * FROM users WHERE email=?", [email])
    } catch(err) { if (err) throw err }
}

//compares password from user and from database
export async function comparePassHash(user_password, db_hash) {
    const match = await bcrypt.compare(user_password, db_hash)
    if (!match) return false
    return true
}