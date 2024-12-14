import { Request, Response } from "express"

import { DbAll, DbGet } from "@/src/models/Db"
import { getContacts } from "@/src/models/GetContacts"

export async function searchUsers(req: Request, res: Response) {
    if (!req.db) {
        throw Error("req.db not accessible")
    }
        
    const user = req.query.username
    const users = await DbAll(req.db,
        "select username from users "+
        "where username like ? || '%' and username != ? limit 15",
        [user, req.username]
    )
    
    res.send({users: users})
}

export async function GetContacts(req: Request, res: Response): Promise<any> {
    if (!req.db) throw Error("req.db not accessible")
        
    try {
        const contacts = await getContacts(req.db, req.user_id)
        if (contacts instanceof Error) {
            throw new Error()
        }

        if (contacts.length == 0) {
            return res.json({
                error: true,
                contacts: [],
                message: "NO_CONTACTS_FOR_THIS_USER"
            })        
        }
        return res.json({error: false, contacts: contacts})

    } catch(err) {
        res.json({error: true, message: "ERROR_LOADING_CONTACTS"})
        console.error("GetContacts:", err)
    }
}