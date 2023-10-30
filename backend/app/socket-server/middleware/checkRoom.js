import connection from "../../database/db.js"

export const checkRoom = async(room_id, user_id) => {
    const sql = "select * from participants where user_id=? and room_id=?"
    const res = connection.query(sql, [user_id, room_id], (err, result) => {
        if (err) console.log(err)
        console.log(result)
    })
    return true
}