import { DbGet } from "@/src/models/Db"
import sqlite3 from "sqlite3"

export async function checkRoom(
    db: sqlite3.Database,
    room_id: number,
    user_id: number
) {
    const sql = "select * from participants where user_id=? and room_id=?"
    const res = await DbGet(db, sql, [user_id, room_id])
    if (res.length < 1) return false
    return true
}