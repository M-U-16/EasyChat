import { queryDb } from "../models/db.js"

export async function searchUsers(req, res) {
    const user = req.query.username
    const users = await queryDb(
        "select username from users "+
        "where username like ? || '%' and username != ?",
        [user, req.username]
    )
    res.send({users: users})
}