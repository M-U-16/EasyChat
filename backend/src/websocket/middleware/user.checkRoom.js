import { queryDb } from "../../models/db.js"

export const checkRoom = async(room_id, user_id) => {
    const sql = "select * from participants where user_id=? and room_id=?"
    const res = await queryDb(sql, [user_id, room_id])
    if (res.length < 1) return false
    return true
}