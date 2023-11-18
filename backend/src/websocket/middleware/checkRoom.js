import connection from "../../database/db.js"

export const checkRoom = async(room_id, user_id) => {
    const sql = "select * from participants where user_id=? and room_id=?"
    const res = await connection
        .promise()
        .query(sql, [user_id, room_id])
        .then(res => res[0])

    if (res) {
        if (res.length < 1) return false
        return true
    }
}