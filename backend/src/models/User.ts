import bcrypt from "bcrypt"
import sqlite3 from "sqlite3"
import { User } from "@/src/controllers/Auth"

import { logger } from "@/src/logger"
import { DbAll, DbGet, DbRun } from "@/src/models/Db"

export interface CheckedUser {
    error: boolean;
    emailError?: boolean;
    serverError: boolean;
    usernameError?: boolean;
}

//validating that the user not already exists
export async function checkUser(db: sqlite3.Database, newUser: User): Promise<CheckedUser> {
    // get the number of occurrences of username and email
    const sql = `SELECT 'username' as type, count(*) AS count
    FROM users WHERE username = ? UNION ALL
    SELECT 'email' as type, count(*) AS count
    FROM users WHERE email = ?`

    try {
        const rows = await DbAll(db, sql, [newUser.username, newUser.email])
        if (rows instanceof Error) {
            throw rows
        }
        
        const counts = {
            "username": 0,
            "email": 0
        }
    
        rows.forEach(element => {
            counts[element.type] = element.count
        })
        
        return {
            error: counts.email != 0 || counts.username != 0,
            emailError: counts.email != 0,
            usernameError: counts.username != 0,
            serverError: false
        }
    } catch(err) {
        logger.error("checkUser:", {error: err})
        return {
            error: true,
            serverError: true
        }
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
export async function comparePassHash(user_password: string, db_hash: string) {
    const match = await bcrypt.compare(user_password, db_hash)
    if (!match) return false
    return true
}