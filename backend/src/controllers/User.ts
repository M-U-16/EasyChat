import { Request, Response } from "express"

import { logger } from "../logger"
import { DbGet } from "@/src/models/Db"
import { getContacts } from "@/src/models/GetContacts"

export async function searchUsers(req: Request, res: Response) {
    if (!req.db) throw Error("req.db not accessible")
        
    const user = req.query.username
    const users = await DbGet(req.db,
        "select username from users "+
        "where username like ? || '%' and username != ?",
        [user, req.username]
    )
    
    res.send({users: users})
}
    
    
export async function GetContacts(req: Request, res: Response): Promise<any> {
    if (!req.db) throw Error("req.db not accessible")
    
    try {
        const contacts = await getContacts(req.db, req.user_id)
        if (!Array.isArray(contacts)) {
            throw new Error()
        }

        if (contacts.length) {
            return res.json({
                error: true,
                contacts: [],
                message: "NO_CONTACTS_FOR_THIS_USER"
            })        
        }
        return res.json({contacts: contacts})

    } catch(err) {
        logger.error("GetContacts:", err)
        return res.json({error: true, message: "ERROR_LOADING_CONTACTS"})
    }
}